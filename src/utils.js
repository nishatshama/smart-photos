import { Auth, Storage, API, graphqlOperation } from 'aws-amplify';

const ListPhotos = `query ListPhotos($username: String!) {
    listPhotos (limit: 1000, filter: {username: {eq: $username}}){
      items {
        id
        key
        labels
        safe
        text
      }
    }
  }`
  ;

export const getUserPhotoData = async () => {
  const user = await Auth.currentAuthenticatedUser();
  const { data } = await API.graphql(graphqlOperation(ListPhotos, { username: user.username }));
  return await Promise.all(data.listPhotos.items.map(async (item) => {
    item.s3 = await Storage.get(item.key);
    return item;
  }));
};