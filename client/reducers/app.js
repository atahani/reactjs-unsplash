import {SE_LAST_PATH_NAME, CH_JOB_ST, SE_ACTION_DATA} from '../constants/action-types';

// initial state of app state
const initialState = {
  action_data: {},
  // the default pathname of application
  last_pathname: '/',
  job_running: 0
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
      // action > jobStatus
    case CH_JOB_ST:
      // like > state.app.job_running
      return Object.assign({}, state, {
        job_running: action.status
          ? state.job_running + 1
          : state.job_running > 0
            ? state.job_running - 1
            : 0
      });
      // action > setActionData
    case SE_ACTION_DATA:
      {
        // change the state with custom attr obj as actionType
        const obj = state.action_data
          ? state.action_data
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
        // like > state.app.action_data.login
        return Object.assign({}, state, {action_data: obj});
      }
    default:
      return state;
  }
}