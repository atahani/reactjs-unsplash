import {SE_LAST_PATH_NAME, CH_JOB_ST} from '../constants/action-types';

// initial state of app state
const initialState = {
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
    default:
      return state;
  }
}