import React, { useState, useEffect, useContext } from 'react';
import { Auth, Storage, API, graphqlOperation, Predictions } from 'aws-amplify';
import {v4 as uuid} from 'uuid';

import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

import config from '../aws-exports';
import { getUserPhotoData } from '../utils';
import { AppContext } from '../reducer/reducer';
import { SET_USER_PHOTO_DATA } from '../reducer/types';

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket
} = config;

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const PutPhoto = `mutation PutPhoto($bucket: String!, $key: String!, $user: String!, $region: String!, $createdAt: AWSTimestamp, $safe: Boolean, $labels: [String], $text: String) {
  createPhoto(input: {bucket: $bucket, key: $key, username: $user, region: $region, safe: $safe, createdAt: $createdAt, labels: $labels, text: $text}){
    bucket
    key
    labels
    createdAt
    safe
  }
}`
;

export default function PhotoUpload() {
  const { dispatch } = useContext(AppContext);
  const classes = useStyles();
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() =>{
    const getPhotos = async() => {
      const userPhotoData = await getUserPhotoData();
      dispatch({ type: SET_USER_PHOTO_DATA, userPhotoData: userPhotoData });
    };
    if(uploadStatus === 'Upload Completed!') {
      getPhotos();
    }
  }, [isUploading]);

  const uploadFile = async (file) => {
    const user = await Auth.currentAuthenticatedUser();
    const filename = `${uuid()}-${file.name}`;
    await Storage.put(
      filename,
      file,
      {
        customPrefix: { public: 'public/uploads/' },
        metadata: { owner: user.username }
      }
    );

    const { labels, unsafe } = await Predictions.identify({
      labels: {
        source: {
          file,
        },
        type: "ALL"
      }
    });
    
    const { text } = await Predictions.identify({
      text: {
        source: {
          file,
        },
        format: "PLAIN",
      }
    });
         
    await API.graphql(graphqlOperation(PutPhoto,
      { bucket: bucket,
        key: `uploads/${filename}`,
        user: user.username,
        region: region,
        labels: labels.map(label => label.name),
        safe: unsafe === 'NO' ? true : false,
        createdAt: Date.now(),
        text: text.fullText.length > 0 ? text.fullText : null
      }));
  }

  const onChange = async (e) => {
    setUploadStatus('Uploading...');
    setIsUploading(true);
    let files = [];
    for (let i = 0; i < e.target.files.length; i++) {
      files.push(e.target.files.item(i));
    }
    await Promise.all(files.map(f => uploadFile(f)));
    setUploadStatus('Upload Completed!');
    setIsUploading(false);
  }

  return (
    <div style={{ marginTop: '18px' }}>
      <Input
        accept="image/*"
        id="raised-button-file"
        multiple
        type="file"
        style={{ display: 'none' }}
        onChange={onChange}
      />
      <label htmlFor="raised-button-file">
        <Button
          raised
          component="span"
          variant="contained"
          className={ classes.button }
          disabled={ isUploading }
        >
          <AddToPhotosIcon /> &nbsp; Upload Photos
        </Button>
      </label>
      <p style={{ paddingLeft: '5px' }}>{uploadStatus}</p>
    </div>
  )
}