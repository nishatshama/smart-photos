import React from 'react';

export default function SearchResult(props) {
  return (
    <div>
      { userPhotoDataReceived ?
        <span>
          <Typography variant="h4" style={{ paddingLeft: '80px'}}>All Photos</Typography>
          <PhotoGrid userPhotoData={ AppDataReducer.userPhotoData }/> 
        </span> : <span/>
      } 
    </div>
  );
}