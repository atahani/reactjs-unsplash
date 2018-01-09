//@flow

import type { Action } from '../types';
import type { AppState } from '../types/state';

// initial state of app state
const initialState = {
  actionData: {},
  // the default pathname of application
  lastPathname: '/',
  jobRunning: 0
};

/**
 * app reducer used in redux
 * @param {object} state
 * @param {object} action
 */
export default (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
      // action > setLastPathName
    case 'app/SE_LAST_PATH_NAME':
      // like > state.app.lastPathname
      return Object.assign({}, state, {lastPathname: action.pathName});
      // action > jobStatus
    case 'app/CH_JOB_ST':
      // like > state.app.jobRunning
      return Object.assign({}, state, {
        jobRunning: action.status
          ? state.jobRunning + 1
          : state.jobRunning > 0
            ? state.jobRunning - 1
            : 0
      });
      // action > setActionData
    case 'app/SE_ACTION_DATA':
      {
        // change the state with custom attr obj as actionType
        const obj = state.actionData
          ? state.actionData
          : {};
        // assing new obj attr if not exist
        if (obj[action.actionType]) {
          obj[action.actionType] = action.data;
        } else {
          // define new property for object
          Object.defineProperty(obj, action.actionType, {
            value: action.data,
            writable: true,
            enumerable: false
          });
        }
        // like > state.app.actionData.login
        return Object.assign({}, state, {actionData: obj});
      }
    default:
      return state;
  }
};