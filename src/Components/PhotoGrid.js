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
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {props.photos.map(value => (
            <Grid key={value} item>
              <Card
                className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={value}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}