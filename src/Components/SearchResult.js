import React from 'react';

import Typography from '@material-ui/core/Typography';

import PhotoGrid from './PhotoGrid';
import { AppContext } from '../reducer/reducer';

export default function SearchResult() {
  const { AppDataReducer } = React.useContext(AppContext);

  return (
    <div>
      <span>
        <Typography variant="h4" style={{ paddingLeft: '80px' }}>Search Result</Typography>
        <PhotoGrid />
      </span> : <span />
    </div>
  );
}