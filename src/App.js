import React from 'react';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import { Auth, Storage, API, graphqlOperation } from 'aws-amplify'

import './App.css';
import PhotoUpload from './Components/PhotoUpload';

Amplify.configure(aws_exports);

function App() {
  return (
    <div className="App">
      <PhotoUpload/>
    </div>
  );
}

export default withAuthenticator(App, {includeGreetings: true});