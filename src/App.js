import React, { useReducer } from 'react';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';

import './App.css';
import ShowPhotos from './Components/ShowPhotos';
import Sidebar from './Components/Sidebar';
import { initialState, reducer, AppContext } from './reducer/reducer';
import { makeStyles } from '@material-ui/core/styles';

Amplify.configure(aws_exports);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 240,
  },
  content: {
    flexGrow: 1,
  },
}));

function App() {
  const [AppDataReducer, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();

  return (
    <AppContext.Provider value={{ AppDataReducer, dispatch }}>
      <div className={classes.root}>
        <Sidebar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          { AppDataReducer.sidebarValue === 'All Photos' ?
            <ShowPhotos /> : (AppDataReducer.sidebarValue === 'Categories' ? <span/> : <span/>)
          }  
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default withAuthenticator(App, { includeGreetings: true });