import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

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
  
}));

export default function PhotoCard(props) {
  const classes = useStyles();

  return (
    <Card
      className={classes.card}>
      <CardMedia
        className={classes.media}
        image={props.image}
      />
    </Card>
  )
}