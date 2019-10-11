import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

import Button from '@material-ui/core/Button';

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
        opacity: 0.4
      }
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
      bottom: '0px',
      right: '0px',
      display: 'flex',
      alignItems: 'center',
   }
}));

export default function PhotoCard(props) {
  const classes = useStyles();
  const [showUnsafe, setShowUnsafe] = React.useState(false);
  const [showHideUnsafe, setShowHideUnsafe] = React.useState(false);

  const [ref, hovered] = useHover();
  
  return (

    <Card
      className={classes.card}>
      <CardMedia
        className={classes.media}
        image={props.image}
        ref = {ref}
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
      <div className={classes.overlaybuttons} >
        <a href={props.image}>
          <IconButton aria-label="download" size="small" color = "primary" className={classes.margin}>
            <ArrowDownwardIcon fontSize="small" />
          </IconButton>
        </a>
        <IconButton color = "secondary" aria-label="delete" className={classes.margin} size="small"
              onClick={() => { window.confirm("Are you sure you wish to delete?") && DeletePhoto(props) }}>
          <DeleteIcon fontSize="small" />
        </IconButton> 
      </div>

    </Card>
  )
}
