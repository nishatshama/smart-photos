
import { Storage, API, graphqlOperation } from 'aws-amplify';

const DeleteItem = `mutation deletePost($name: ID!) {
    deletePhoto( input:{id: $name }) {
            id
            key
            labels
            safe
            text
  }
}`;


export default function DeletePhoto(props) {
        //delete photo
        Storage.remove(props.path)
            .then(result => console.log(result))
            .catch(err => console.log(err));
       
        //delete dynamo item
        const request = async () => {
                const deleteresult = await API.graphql(graphqlOperation(DeleteItem, {name: props.id}));
                const json = await deleteresult;
                console.log(json);
        }
        request();
        // console.log(props);
    
}

