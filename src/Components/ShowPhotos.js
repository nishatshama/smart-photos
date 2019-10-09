import React, { useState, useEffect } from 'react';
import { Auth, Storage, API, graphqlOperation } from 'aws-amplify'
import PhotoGrid from './PhotoGrid';

const ListPhotos = `query ListPhotos($username: String!) {
  listPhotos (limit: 1000, filter: {username: {eq: $username}}){
    items {
      id
      key
    }
  }
}`
;

export default function ShowPhotos() {
  const [userPhotos, setUserPhotos] = useState([]);
  useEffect(() => {
    const getPhotos = async() => {
      const photos = await getUserPhotos();
      setUserPhotos(photos);
    };
    getPhotos();
  }, []);

  const getUserPhotos = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const { data } = await API.graphql(graphqlOperation(ListPhotos, { username: user.username }));
    return await Promise.all(data.listPhotos.items.map(async(item) => {
      item.s3 = await Storage.get(item.key);
      return item;
    }));
  }

  return (
    <div>
      { userPhotos.length > 0 ? 
        <PhotoGrid photos={ userPhotos }/> : <span/>
      } 
    </div>
  );
}