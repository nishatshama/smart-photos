import React, { useReducer, useEffect, useState } from 'react';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import { Auth, Storage, API, graphqlOperation } from 'aws-amplify';

import './App.css';
import ShowPhotos from './Components/ShowPhotos';
import Sidebar from './Components/Sidebar';
import { initialState, reducer, AppContext } from './reducer/reducer';
import { makeStyles } from '@material-ui/core/styles';
import { SET_USER_PHOTO_DATA } from './reducer/types';
import SearchResult from './Components/SearchResult';

Amplify.configure(aws_exports);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

const ListPhotos = `query ListPhotos($username: String!) {
  listPhotos (limit: 1000, filter: {username: {eq: $username}}){
    items {
      id
      key
      labels
      safe
    }
  }
}`
;

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
  const [userPhotoDataReceived, setUserPhotoDataReceived] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const getPhotos = async() => {
      const userPhotoData = await getUserPhotoData();
      dispatch({ type: SET_USER_PHOTO_DATA, userPhotoData: userPhotoData });
      setUserPhotoDataReceived(true);
    };
    getPhotos();
  }, []);

  const getUserPhotoData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const { data } = await API.graphql(graphqlOperation(ListPhotos, { username: user.username }));
    return await Promise.all(data.listPhotos.items.map(async(item) => {
      item.s3 = await Storage.get(item.key);
      return item;
    }));
  }

  return (
    <AppContext.Provider value={{ AppDataReducer, dispatch }}>
      <div className={classes.root}>
        <Sidebar />
        { userPhotoDataReceived ? 
          <main className={classes.content}>
            <div className={classes.toolbar} />
            { AppDataReducer.searchString.length > 0 ?
              <SearchResult/> : <span/>
            }
            { AppDataReducer.sidebarValue === 'All Photos' ?
                <ShowPhotos /> : (
                  AppDataReducer.sidebarValue === 'Categories' ? <span/> : <span/>)
            }
          </main> : <span/>
        }
      </div>
    </AppContext.Provider>
  );
}

export default withAuthenticator(App, { includeGreetings: true });