import {SE_LAST_PATH_NAME} from '../constants/action-types';

// initial state of app state
const initialState = {
  // the default pathname of application
  last_pathname: '/'
};

/**
 * app reducer used in redux
 * @param {object} state
 * @param {object} action
 */
export default function appReducer(state = initialState, action) {
  switch (action.type) {
      // action > setLastPathName
    case SE_LAST_PATH_NAME:
      // like > state.app.last_pathname
      return Object.assign({}, state, {last_pathname: action.pathName});
    default:
      return state;
  }
}