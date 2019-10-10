import React, { useContext } from 'react';

import Typography from '@material-ui/core/Typography';

import PhotoGrid from './PhotoGrid';
import { AppContext } from '../reducer/reducer';

export default function Categories() {
  const { AppDataReducer } = useContext(AppContext);

  return (
    <div>
      <span>
        <Typography variant="h4" style={{ paddingLeft: '80px' }}>Photo Categories</Typography>
        <PhotoGrid userPhotoData={AppDataReducer.userPhotoData} />
      </span>
    </div>
  );
}