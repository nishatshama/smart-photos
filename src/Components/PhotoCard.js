import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { Storage, API, graphqlOperation } from 'aws-amplify';

import { getUserPhotoData } from '../utils';
import { AppContext } from '../reducer/reducer';
import { SET_USER_PHOTO_DATA } from '../reducer/types';

const DeleteItem = `mutation deletePost($name: ID!) {
  deletePhoto( input:{id: $name }) {
    id
    key
    labels
    safe
    text
  }
}`;

const useStyles = makeStyles(theme => ({
  card: {
    width: 145,
    border: '1px solid #ddd',
    borderRadius: '0px',
    position: 'relative'
  },
  media: {
    height: 200,
  },

  control: {
    flex: '1 0 auto'
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '0',
    left: '-2px',
    color: 'white',
    backgroundColor: 'rgba(122, 78, 78)'
  },
  overlayShow: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '0',
    left: '-2px',
    color: 'white',
  },
  overlaybuttons: {
    position: 'absolute',
    bottom: '1px',
    right: '0px',
    alignItems: 'center',
  }
}));


export default function PhotoCard(props) {
  const classes = useStyles();

  const { dispatch } = React.useContext(AppContext);

  const [showUnsafe, setShowUnsafe] = React.useState(false);
  const [showHideUnsafe, setShowHideUnsafe] = React.useState(false);
  const [showDownloadDelete, setShowDownloadDelete] = React.useState(false);

  const DeletePhoto = async () => {
    await Storage.remove(props.path)
    const deleteresult = await API.graphql(graphqlOperation(DeleteItem, { name: props.id }));
    const json = await deleteresult;
    console.log(json);

    const userPhotoData = await getUserPhotoData();
    dispatch({ type: SET_USER_PHOTO_DATA, userPhotoData: userPhotoData });
  }

  return (

    <Card
      className={classes.card}
      onMouseOver={() => setShowDownloadDelete(true)}
      onMouseLeave={() => setShowDownloadDelete(false)}
    >

      <CardMedia
        className={classes.media}
        image={props.image}
      />
      {!props.safe ?
        !showUnsafe ?
          <Box component="fieldset" mb={3} className={classes.overlay} borderColor="transparent">
            <Fab
              variant="extended"
              size="small"
              aria-label="add"
              className={classes.margin}
              style={{ marginTop: '70px', marginLeft: '22px' }}
              onClick={() => setShowUnsafe(true)}
            >
              View
              <VisibilityIcon className={classes.extendedIcon} />
            </Fab>
          </Box> :
          <Box
            component="fieldset"
            mb={3}
            className={classes.overlayShow}
            borderColor="transparent"
            onMouseOver={() => setShowHideUnsafe(true)}
            onMouseLeave={() => setShowHideUnsafe(false)}
          >
            {showHideUnsafe ?
              <VisibilityOffIcon
                style={{ marginLeft: '80%' }}
                onClick={() => setShowUnsafe(false)}
              /> : <span />
            }
          </Box> : <span />
      }
      {showDownloadDelete ?
        <Box
          className={classes.overlaybuttons}
        >
          <a href={props.image}>
            <Fab
              variant="extended"
              size="small"
              aria-label="add"
              className={classes.margin}
              style={{ marginRight: '5px', marginBottom: '5px' }}
            >
              <ArrowDownwardIcon fontSize="small" />
            </Fab>
          </a>
          <Fab
            variant="extended"
            aria-label="delete"
            className={classes.margin}
            size="small"
            style={{ marginRight: '2px', marginBottom: '5px' }}
            onClick={() => { window.confirm("Are you sure you wish to delete?") && DeletePhoto() }}>
            <DeleteIcon fontSize="small" />
          </Fab>
        </Box> : <span />}
    </Card>
  )
}