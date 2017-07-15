import {fork, all} from 'redux-saga/effects';
import {getAccessTokenF} from './user';

export default function* root() {
  yield all([// user saga flows
    fork(getAccessTokenF)]);
}