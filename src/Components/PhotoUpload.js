import React, { useState } from 'react';
import { Auth, Storage, API, graphqlOperation } from 'aws-amplify';
import {v4 as uuid} from 'uuid';

import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

import config from '../aws-exports';

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

const PutPhoto = `mutation PutPhoto($bucket: String!, $key: String!, $user: String!, $region: String!) {
  createPhoto(input: {bucket: $bucket, key: $key, username: $user, region: $region}){
    bucket
    key
  }
}`
;

export default function PhotoUpload() {
  const classes = useStyles();
  const [uploadStatus, setUploadStatus] = useState('');

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
    await API.graphql(graphqlOperation(PutPhoto, {bucket: bucket, key: `uploads/${filename}`, user: user.username, region: region}));
  }

  const onChange = async (e) => {
    setUploadStatus('Uploading...');
    let files = [];
    for (let i = 0; i < e.target.files.length; i++) {
      files.push(e.target.files.item(i));
    }
    await Promise.all(files.map(f => uploadFile(f)));
    setUploadStatus('Upload Completed!');
  }

  return (
    <div style={{ marginTop: '40px' }}>
      <Input
        accept="image/*"
        id="raised-button-file"
        multiple
        type="file"
        style={{ display: 'none' }}
        onChange={onChange}
      />
      <label htmlFor="raised-button-file">
        <Button raised component="span" variant="contained" className={classes.button}>
          <AddToPhotosIcon /> &nbsp; Upload Photos
        </Button>
      </label>
      <span>{uploadStatus}</span>
    </div>
  )
}