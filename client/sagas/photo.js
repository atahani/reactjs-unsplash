/*eslint-disable no-constant-condition*/
import {take, put, call, fork} from 'redux-saga/effects';
import {handleCommonErr} from './app';
import {jobStatus} from '../actions/app';
import {GE_PHOTOS} from '../constants/action-types';
import {getPhotos} from '../api/photo';
import {setPhotos} from '../actions/photo';

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
      console.warn('the photos array', response);
      console.warn('the attr',attr);
      yield put(setPhotos(response));
    } else {
      yield fork(handleCommonErr, error, GE_PHOTOS);
    }
  }
}