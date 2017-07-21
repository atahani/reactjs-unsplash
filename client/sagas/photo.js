/*eslint-disable no-constant-condition*/
import {take, put, call, fork, all} from 'redux-saga/effects';
import {handleCommonErr} from './app';
import {jobStatus} from '../actions/app';
import {GE_PHOTOS} from '../constants/action-types';
import {getPhotos} from '../api/photo';
import {setItems, setItemsAttr} from '../actions/items';

/**
 * get photos flow
 */
export function* getPhotosF() {
  while (true) {
    const {url} = yield take(GE_PHOTOS);
    yield put(jobStatus(true));
    const {response, error, attr} = yield call(getPhotos, url);
    yield put(jobStatus(false));
    if (response) {
      yield all([
        put(setItems('photos', response)),
        put(setItemsAttr('photos', attr))
      ]);
    } else {
      yield fork(handleCommonErr, error, GE_PHOTOS);
    }
  }
}