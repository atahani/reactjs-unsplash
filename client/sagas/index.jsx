import {fork, all} from 'redux-saga/effects';
import {getAccessTokenF, logOutF, getMyProfileF} from './user';

export default function* root() {
  yield all([ // user saga flows
    fork(getAccessTokenF),
    fork(logOutF),
    fork(getMyProfileF),
  ]);
}