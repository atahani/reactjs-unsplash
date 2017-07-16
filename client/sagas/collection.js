/*eslint-disable no-constant-condition*/
import {take, put, call, fork, all} from 'redux-saga/effects';
import {startSubmit, stopSubmit} from 'redux-form';
import {push} from 'react-router-redux';
import {handleCommonErr} from './app';
import {jobStatus} from '../actions/app';
import {getReq} from '../api/rest-helper';
import {createCollection, updateCollection} from '../api/collection';
import {setItems, setItemsAttr, setItem, updateItem} from '../actions/items';
import {getCollectionPhotos} from '../actions/collection';
import {
  GE_USER_COLLECTIONS,
  GE_COLLECTION,
  GE_COLLECTION_PHOTOS,
  SEARCH_COLLECTIONS,
  CREATE_COLLECTION,
  UPDATE_COLLECTION
} from '../constants/action-types';
import {getState, getHistory} from '../store';

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

/**
 * search in collection flow
 */
export function* searchInCollectionsF() {
  while (true) {
    const {url} = yield take(SEARCH_COLLECTIONS);
    yield put(jobStatus(true));
    const {response, error, attr} = yield call(getReq, url);
    yield put(jobStatus(false));
    if (response) {
      // https://unsplash.com/documentation#search-collections
      const {total, total_pages, results} = response;
      yield all([
        put(setItems('collections', results)),
        put(setItemsAttr('collections', {
          last: attr.last,
          next: attr.next,
          total,
          total_pages
        }))
      ]);
    } else {
      yield fork(handleCommonErr, error, SEARCH_COLLECTIONS, {url});
    }
  }
}

/**
 * create collection flow
 */
export function* createCollectionF() {
  while (true) {
    const {values} = yield take(CREATE_COLLECTION);
    yield all([
      put(jobStatus(true)),
      put(startSubmit('add_or_edit_collection'))
    ]);
    const {response, error} = yield call(createCollection, values);
    yield all([
      put(jobStatus(false)),
      put(stopSubmit('add_or_edit_collection'))
    ]);
    if (response) {
      // update the entity
      // NOTE: the user collection locate in user_collections
      yield put(setItem('user_collections', response));
      // get current search path in url if startsWith ?add_to_collection&id=
      const {search} = getHistory().location;
      const searchParams = new URLSearchParams(search);
      if (searchParams.has('step') && searchParams.has('id')) {
        // get id from url
        yield put(push(`?add_to_collection&id=${searchParams.get('id')}`));
      } else {
        yield put(push(`/collections/${response.id}`));
      }
    } else {
      yield fork(handleCommonErr, error, CREATE_COLLECTION, {values});
    }
  }
}

/**
 * update collection flow
 */
export function* updateCollectionF() {
  while (true) {
    const {id, values} = yield take(UPDATE_COLLECTION);
    yield all([
      put(jobStatus(true)),
      put(startSubmit('add_or_edit_collection'))
    ]);
    yield;
    const {response, error} = yield call(updateCollection, id, values);
    yield all([
      put(jobStatus(false)),
      put(stopSubmit('add_or_edit_collection'))
    ]);
    if (response) {
      // update the entity
      // NOTE: the user collection locate in user_collections
      yield all([
        put(updateItem('user_collections', response)),
        put(push(`/collections/${response.id}`))
      ]);
    } else {
      yield fork(handleCommonErr, error, UPDATE_COLLECTION, {id, values});
    }
  }
}