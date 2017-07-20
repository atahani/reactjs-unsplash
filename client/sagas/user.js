/*eslint-disable no-constant-condition*/
import {take, put, call, all, fork} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {push} from 'react-router-redux';
import {GE_ACCESS_TOKEN, LOGOUT, GE_USER_PROFILE} from '../constants/action-types';
import {getAccessToken, getUserProfile} from '../api/user';
import {setAccessToken, getProfile, setProfile} from '../actions/user';
import {clearStore, jobStatus} from '../actions/app';
import {handleCommonErr} from './app';

/**
 * get access token flow
 */
export function* getAccessTokenF() {
  while (true) {
    const {code} = yield take(GE_ACCESS_TOKEN);
    // check code define or not
    if (!code) {
      yield put(push('/auth'));
      return;
    }
    const {response, error} = yield call(getAccessToken, code);
    if (response) {
      yield all([
        put(setAccessToken(response)),
        put(getProfile()),
        put(push('/'))
      ]);
    } else if (error.code === 401) {
      // handle it when token is invalid
      yield put(push('/auth'));
    } else {
      yield fork(handleCommonErr, error);
    }
  }
}

/**
 * log out flow
 */
export function* logOutF() {
  while (true) {
    yield take(LOGOUT);
    yield all([
      put(push('/auth')),
      put(clearStore())
    ]);
  }
}

/**
 * get logged in user profile
 */
export function* getMyProfileF() {
  while (true) {
    yield take(GE_USER_PROFILE);
    yield put(jobStatus(true));
    const {response, error} = yield call(getUserProfile);
    yield call(delay, 4000);
    yield put(jobStatus(false));
    if (response) {
      yield put(setProfile(response));
    } else {
      yield fork(handleCommonErr, error, GE_USER_PROFILE);
    }
  }
}