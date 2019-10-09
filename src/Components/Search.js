import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { AppContext } from '../reducer/reducer';
import { SET_SEARCH_STRING } from '../reducer/types';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '7px',
    marginTop: '15px',
    marginBottom: '25px',
    width: 190,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function CustomizedInputBase() {
  const classes = useStyles();
  const { dispatch } = React.useContext(AppContext);
  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search Photos"
        inputProps={{ 'aria-label': 'search photos' }}
        onChange={(e) => dispatch({ type: SET_SEARCH_STRING, searchString: e.target.value })}
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}