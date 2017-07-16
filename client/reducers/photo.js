import mapKeys from 'lodash/mapKeys';
import omit from 'lodash/omit';
import {SE_PHOTOS} from '../constants/action-types';

export default function photoReducer(state = {}, action) {
  switch (action.type) {
    case SE_PHOTOS:
      {
        const newPhotos = mapKeys(action.payload, 'id');
        return {
          ...newPhotos,
          ...state
        };
      }
      //NOTE: these for test
    case "SE_PHOTO":
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case "UP_PHOTO":
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case "DEL_PHOTO":
      // the payload === id of photo
      return omit(state, action.payload);
    default:
      return state;
  }
}