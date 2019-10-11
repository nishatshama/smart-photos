import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { AppContext } from '../reducer/reducer';
import PhotoCard from './PhotoCard';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

export default function FolderList() {
  const classes = useStyles();
  const { AppDataReducer } = React.useContext(AppContext);

  return (
    <div>
      <Typography variant="h4" >Scan Results</Typography>
      <List className={classes.root}>
        {AppDataReducer.userPhotoData.filter(photoEntity =>
          photoEntity.text !== null && photoEntity.text.length > 0).map(photoEntity => {
            return (
              <ListItem>
                <PhotoCard
                  image={ photoEntity.s3 }
                  safe={ photoEntity.safe }
                  id = {photoEntity.id}
                  path = {photoEntity.key}
                />
                <ListItemText style={{ margin: '20px', width: '10%' }} primary={photoEntity.text} />
              </ListItem>
            )
          })}
      </List>
    </div>
  );
}