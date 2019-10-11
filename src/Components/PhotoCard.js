import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';

import useHover from './Hover';
import DeletePhoto from './DeletePhoto'

const useStyles = makeStyles(theme => ({
  card: {
    width: 145,
    border: '1px solid #ddd',
    borderRadius: '0px',
    position: 'relative'
  },
  media: {
    height: 200,
    
    "&:hover": {
        opacity: 0.6
      }
  },
  
  control: {
    flex: '1 0 auto'
  },
  
  overlaybuttons: {
      position: 'absolute',
      top: '2px',
      right: '2px',
      display: 'flex',
      alignItems: 'center',
   }
}));

export default function PhotoCard(props) {
  const classes = useStyles();
  const [ref, hovered] = useHover();
  
  return (

    <Card
      className={classes.card}>
      <CardMedia
        className={classes.media}
        image={props.image}
        ref = {ref}
      />
      <div className={classes.overlaybuttons} >
        <a href={props.image}>
          <IconButton aria-label="download" className={classes.margin}>
            <ArrowDownwardIcon fontSize="medium" />
          </IconButton>
        </a>
        <IconButton aria-label="delete" className={classes.margin} ref={ref} 
              onClick={() => { window.confirm("Are you sure you wish to delete?") && DeletePhoto(props) }}>
          <DeleteIcon fontSize="medium" />
        </IconButton> 
      </div>

    </Card>
  )
}
