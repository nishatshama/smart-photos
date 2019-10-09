import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  card: {
    width: 145,
    border: '1px solid #ddd',
    borderRadius: '0px',
    position: 'relative'
  },
  media: {
    height: 200,
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
              <Grid key={value.id} item>
                <Card
                  className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={value.s3}
                  />
                </Card>
              </Grid>
            ))}
            </Grid>
          </Grid>
        </Grid> : <span/> 
      }
    </div>
  );
}