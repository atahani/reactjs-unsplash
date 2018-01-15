//@flow

/*eslint-disable no-constant-condition*/
import {put} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import {UN_AVAILABLE, NOT_FOUND} from '../constants/api-error-codes';
import {NOTHING} from '../constants/action-types';
import type { Action } from '../types';
import APIError from '../api/api-error';

// import { jobStatus } from '../actions/app'; import { deInvalidRefreshToken }
// from '../actions/user'; import { getState } from '../store';

/**
 * run action in sequential
 * get action object and run yield put(actionObj)
 */
export function* runActionInSeq(actionObj: Action): any {
  yield put(actionObj);
}

/**
 * handle common error like
 * no internet connection || server unavailable
 * server 500 Err || 401 UnAuthorized || 403 forbidden
 * then refresh token if access token expired then rerun action
 * @param {object} err error object with code and message
 * @param {string} taskAction
 * @param {object} taskPayload
 */
export function* handleCommonErr(err: APIError, taskAction: string = NOTHING, taskPayload: Object = {}): any {
  if (err.code === UN_AVAILABLE) {
    // check the internet connection by window.navigator.onLine
    if (window.navigator.onLine) {
      // mean's server unavailable yield put(showFeedback('unavailable'));
    } else {
      // mean's have no connection yield put(showFeedback('no_connection'));
    }
  } else if (err.code === NOT_FOUND) {
    yield put(push('/404'));
  } else if (err.code === 401) {
    // check if access_token expired since the request get 401 error should detect
    // unauthorized if (getState().user.isAuthorized) {   yield
    // put(jobStatus(true));   // should refresh token and retry the task   const
    // {response, error} = yield call(refreshToken, getState().user.refresh_token);
    // if (response) {     // first set authentication information     yield*
    // runActionInSeq(setAuthRes(response.profile, response.token,
    // response.email_address));     // rerun the action when got new token     if
    // (taskAction !== NOTHING) {       yield* runActionInSeq({         type:
    // taskAction, ...taskPayload       });     }   // handle if refresh token is
    // invalid   } else if (error.code === 400) {     // take action to remove all
    // of the auth information     yield all([       put(jobStatus(false)),
    // put(deInvalidRefreshToken()),     ]);   // handle common error for refresh
    // token it's like no internet connection or service un available   } else {
    // yield call(handleCommonErr, error);   } } handle internal server
  } else {
    // yield put(showFeedback('internal_server_error'));
  }
}