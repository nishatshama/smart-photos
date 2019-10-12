import React, { useContext, useEffect, useState } from 'react';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import PhotoGrid from './PhotoGrid';
import { AppContext } from '../reducer/reducer';

const categoryMapping = [
  {
    place: ['Indoors', 'Outdoors', 'Building', 'House', 'Housing', 'Town', 'City', 'Urban', 'Room', 'Restaurant', 'Cafeteria']
  },
  {
    tree: ['Tree', 'Plant', 'Grass']
  },
  {
    animal: ['Animal', 'Bird', 'Wildlife', 'Pet']
  },
  {
    text: ['Text', 'Letter', 'Alphabet']
  },
  {
    people: ['People', 'Human', 'Person', 'Face']
  },
  {
    vehicle: ['Vehicle', 'Car', 'Truck', 'Transportation']
  },
  {
    art: ['Art', 'Graphics']
  },
  {
    food: ['Food', 'Drink', 'Beverage']
  }
]

export default function Categories() {
  const { AppDataReducer } = useContext(AppContext);
  const [photosByCategory, setPhotosByCategory] = useState(null);

  useEffect(() => {
    const categoryPhotos = {
      place: [],
      tree: [],
      animal: [],
      people: [],
      food: [],
      vehicle: [],
      art: [],
      text: []
    };
    AppDataReducer.userPhotoData.forEach(photo => {
      categoryMapping.forEach(category => {
        for (let key in category) {
          if (photo.labels.filter(value => category[key].includes(value)).length > 0) {
            categoryPhotos[key].push(photo);
          }
        }
      })
    });
    setPhotosByCategory(categoryPhotos);
  }, []);

  return (
    <div>
      <span>
        <Typography variant="h4" style={{ paddingLeft: '80px' }}>Photo Categories</Typography>
        {photosByCategory ?
          Object.keys(photosByCategory).map(key =>
            <div style={{ marginTop: '40px', marginLeft: '80px' }}>
              <Typography variant="h5" style={{ textTransform: 'capitalize' }}>{key}</Typography>
              <Divider />
              <PhotoGrid userPhotoData={photosByCategory[key]} />
            </div>)
          : <span />
        }
      </span>
    </div>
  );
}