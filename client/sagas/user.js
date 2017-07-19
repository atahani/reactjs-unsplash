/*eslint-disable no-constant-condition*/
import {take, put, call, fork, all} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import {GE_ACCESS_TOKEN} from '../constants/action-types';

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
    console.warn('Code',code);
  }
}