//@flow

/*eslint-disable no-constant-condition*/
import { take, put, call, fork, all } from 'redux-saga/effects';
import { handleCommonErr } from './app';
import { jobStatus } from '../actions/app';
import {
  GE_PHOTOS,
  LIKE_PHOTO,
  UNLIKE_PHOTO,
  SEARCH_PHOTOS,
  GE_PHOTO,
} from '../constants/action-types';
import { getPhotos, likePhoto, unLikePhoto, getPhoto } from '../api/photo';
import { getReq } from '../api/rest-helper';
import {
  setItems,
  setItemsAttr,
  updateFieldsOfItem,
  setItem,
} from '../actions/items';

/**
 * get photos flow
 */
export function* getPhotosF(): any {
  while (true) {
    const { url } = yield take(GE_PHOTOS);
    yield put(jobStatus(true));
    const { response, error, attr } = yield call(getPhotos, url);
    yield put(jobStatus(false));
    if (response) {
      yield all([
        put(setItems('photos', response)),
        put(setItemsAttr('photos', attr)),
      ]);
    } else {
      yield fork(handleCommonErr, error, GE_PHOTOS);
    }
  }
}

/**
 * like photo flow
 */
export function* likePhotoF(): any {
  while (true) {
    const { id } = yield take(LIKE_PHOTO);
    yield put(jobStatus(true));
    const { response, error } = yield call(likePhoto, id);
    yield put(jobStatus(false));
    if (response) {
      //TODO: show feedback
      yield put(updateFieldsOfItem('photos', id, response.photo));
    } else {
      yield fork(handleCommonErr, error, LIKE_PHOTO, { id });
    }
  }
}

/**
 * unlike photo flow
 */
export function* unLikePhotoF(): any {
  while (true) {
    const { id } = yield take(UNLIKE_PHOTO);
    yield put(jobStatus(true));
    const { response, error } = yield call(unLikePhoto, id);
    yield put(jobStatus(false));
    if (response) {
      yield put(updateFieldsOfItem('photos', id, response.photo));
    } else {
      yield fork(handleCommonErr, error, UNLIKE_PHOTO, { id });
    }
  }
}

/**
 * search in photos flow
 */
export function* searchInPhotosF(): any {
  while (true) {
    const { url } = yield take(SEARCH_PHOTOS);
    yield put(jobStatus(true));
    const { response, error, attr } = yield call(getReq, url);
    yield put(jobStatus(false));
    if (response) {
      // https://unsplash.com/documentation#search-photos
      const { total, total_pages, results } = response;
      yield all([
        put(setItems('photos', results)),
        put(
          setItemsAttr('photos', {
            last: attr.last,
            next: attr.next,
            total,
            total_pages,
          })
        ),
      ]);
    } else {
      yield fork(handleCommonErr, error, SEARCH_PHOTOS, { url });
    }
  }
}

/**
 * get photo by id flow
 */
export function* getPhotoF(): any {
  while (true) {
    const { id } = yield take(GE_PHOTO);
    yield put(jobStatus(true));
    const { response, error } = yield call(getPhoto, id);
    yield put(jobStatus(false));
    if (response) {
      yield put(setItem('photos', response));
    } else {
      yield fork(handleCommonErr, error, GE_PHOTO, { id });
    }
  }
}
