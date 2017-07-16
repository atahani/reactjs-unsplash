/*eslint-disable no-constant-condition*/
import {take, put, call, fork, all} from 'redux-saga/effects';
import {handleCommonErr} from './app';
import {jobStatus} from '../actions/app';
import {getReq} from '../api/rest-helper';
import {setItems, setItemsAttr, setItem} from '../actions/items';
import {getCollectionPhotos} from '../actions/collection';
import {GE_USER_COLLECTIONS, GE_COLLECTION, GE_COLLECTION_PHOTOS} from '../constants/action-types';
import {getState} from '../store';

/**
 * get user collections flow
 */
export function* getUserCollectionsF() {
  while (true) {
    const {url} = yield take(GE_USER_COLLECTIONS);
    yield put(jobStatus(true));
    const {response, error, attr} = yield call(getReq, url);
    yield put(jobStatus(false));
    if (response) {
      yield all([
        put(setItems('user_collections', response)),
        put(setItemsAttr('user_collections', attr))
      ]);
    } else {
      yield fork(handleCommonErr, error, GE_USER_COLLECTIONS, {url});
    }
  }
}

/**
 * get collection flow
 */
export function* getCollectionF() {
  while (true) {
    const {url, loadPhotos} = yield take(GE_COLLECTION);
    yield put(jobStatus(true));
    const {response, error} = yield call(getReq, url);
    yield put(jobStatus(false));
    if (response) {
      // set collection to store check loggedIn user is owner of this collection or
      // not
      const userId = getState().user.user_profile.id;
      if (userId && userId === response.user.id) {
        yield put(setItem('user_collections', response));
      } else {
        yield put(setItem('collections', response));
      }
      if (loadPhotos) {
        // get photos collection by link
        yield put(getCollectionPhotos(response.links.photos));
      }
    } else {
      yield fork(handleCommonErr, error, GE_COLLECTION, {url});
    }
  }
}

/**
 * get photos of collection flow
 */
export function* getCollectionPhotosF() {
  while (true) {
    const {url} = yield take(GE_COLLECTION_PHOTOS);
    yield put(jobStatus(true));
    const {response, error, attr} = yield call(getReq, url);
    yield put(jobStatus(false));
    if (response) {
      yield all([
        put(setItems('photos', response)),
        put(setItemsAttr('photos', attr))
      ]);
    } else {
      yield fork(handleCommonErr, error, GE_COLLECTION_PHOTOS, {url});
    }
  }
}