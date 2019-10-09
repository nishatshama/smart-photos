import React from 'react';

import {
  SET_USER,
  SET_USER_PHOTO_DATA,
  SET_SIDEBAR_VALUE
} from './types';

export const AppContext = React.createContext(null);

export const initialState = {
  user: null,
  userPhotoData: '',
  sidebarValue: 'All Photos',
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
    case SET_SIDEBAR_VALUE:
      return {
        ...state,
        sidebarValue: action.sidebarValue
      };
    default:
      return initialState;
  }
}
