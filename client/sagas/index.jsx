import {fork, all} from 'redux-saga/effects';
import {getAccessTokenF, logOutF, getMyProfileF} from './user';
import {getPhotosF} from './photo';

export default function* root() {
  yield all([ // user saga flows
    fork(getAccessTokenF),
    fork(logOutF),
    fork(getMyProfileF),
    fork(getPhotosF),
  ]);
}