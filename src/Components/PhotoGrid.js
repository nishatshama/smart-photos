import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import PhotoCard from './PhotoCard';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function PhotoGrid(props) {
  const classes = useStyles();

  return (
    <div style={{ margin: '50px'}}>
      { props.userPhotoData ? 
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
            {props.userPhotoData.map(value => (
              <Grid key={ value.id } item>
                <PhotoCard
                  image={ value.s3 }
                  safe={ value.safe }
                />
              </Grid>
            ))}
            </Grid>
          </Grid>
        </Grid> : <span/> 
      }
    </div>
  );
}