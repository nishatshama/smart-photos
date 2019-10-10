import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

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
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '0',
    left: '-2px',
    color: 'black',
    backgroundColor: 'rgba(122, 78, 78)'
  }
}));

export default function PhotoCard(props) {
  const classes = useStyles();
  const [showUnsafe, setShowUnsafe] = React.useState(false);

  return (
    <Card
      className={classes.card}>
        <CardMedia
        className={classes.media}
        image={props.image}
      />
      { !props.safe && !showUnsafe ? 
          <Box component="fieldset" mb={3} className={classes.overlay} borderColor="transparent">
            <VisibilityOffIcon
              style={{marginTop: '70%', marginLeft: '40%'}}
              onClick={() => setShowUnsafe(true)}
            />
          </Box> : <span/>
      }
    </Card>
  )
}