import React from 'react';

import {
  SET_USER,
  SET_USER_PHOTO_DATA
} from './types';

export const AppContext = React.createContext(null);

export const initialState = {
  user: null,
  userPhotoData: '',
};

export function reducer(state, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user
      };
    case SET_USER_PHOTO_DATA:
      return {
        ...state,
        userPhotoData: action.userPhotoData
      };
    default:
      return initialState;
  }
}
