import React, { useState, useEffect, useContext } from 'react';
import { Auth, Storage, API, graphqlOperation } from 'aws-amplify'

import PhotoGrid from './PhotoGrid';
import { AppContext } from '../reducer/reducer';
import { SET_USER_PHOTO_DATA } from '../reducer/types';


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

export default function ShowPhotos() {
  const [userPhotoData, setUserPhotoData] = useState([]);
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    const getPhotos = async() => {
      const userPhotoData = await getUserPhotoData();
      dispatch({ type: SET_USER_PHOTO_DATA, userPhotoData: userPhotoData });
      setUserPhotoData(userPhotoData);
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
    <div>
      { userPhotoData.length > 0 ?
        <PhotoGrid photos={ userPhotoData }/> : <span/>
      } 
    </div>
  );
}