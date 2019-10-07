import React, { useState, useEffect } from 'react';
import { Auth, Storage, API, graphqlOperation } from 'aws-amplify'
import PhotoGrid from './PhotoGrid';

const ListPhotos = `query ListPhotos($username: String!) {
  listPhotos (filter: {username: {eq: $username}}){
    items {
      id
      key
    }
  }
}`
;

export default function ShowPhotos() {
  const [userPhotos, setUserPhotos] = useState([]);
  useEffect(async () => {
    const photos = await getUserPhotos();
    setUserPhotos(photos);
  }, []);

  const getUserPhotos = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const { data } = await API.graphql(graphqlOperation(ListPhotos, { username: user.username }));
    return await Promise.all(data.listPhotos.items.map(item => Storage.get(item.key)));
  }

  return (
    <div style={{ width: '100%', padding: '40px'}}>
      { userPhotos.length > 0 ? 
        <PhotoGrid photos={ userPhotos }/> : <span/>
      } 
    </div>
  );
}