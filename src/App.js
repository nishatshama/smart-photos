import React from 'react';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

import './App.css';
import PhotoUpload from './Components/PhotoUpload';
import ShowPhotos from './Components/ShowPhotos';

Amplify.configure(aws_exports);

function App() {
  return (
    <div className="App">
      <PhotoUpload/>
      <ShowPhotos/>
    </div>
  );
}

export default withAuthenticator(App, {includeGreetings: true});