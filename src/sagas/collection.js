//@flow

/*eslint-disable no-constant-condition*/
import { take, put, call, fork, all } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import { push } from 'react-router-redux';
import { handleCommonErr } from './app';
import { jobStatus } from '../actions/app';
import { getReq } from '../api/rest-helper';
import {
  createCollection,
  updateCollection,
  deleteCollection,
  addPhotoToCollection,
  removePhotoFromCollection,
} from '../api/collection';
import {
  setItems,
  setItemsAttr,
  setItem,
  updateItem,
  removeItem,
} from '../actions/items';
import { getCollectionPhotos } from '../actions/collection';
import {
  GE_USER_COLLECTIONS,
  GE_COLLECTION,
  GE_COLLECTION_PHOTOS,
  SEARCH_COLLECTIONS,
  CREATE_COLLECTION,
  UPDATE_COLLECTION,
  DELETE_COLLECTION,
  ADD_PHOTO_TO_COLLECTION,
  REMOVE_PHOTO_FROM_COLLECTION,
} from '../constants/action-types';
import { getState, getHistory } from '../store';

/**
 * get user collections flow
 */
export function* getUserCollectionsF(): any {
  while (true) {
    const { url } = yield take(GE_USER_COLLECTIONS);
    yield put(jobStatus(true));
    const { response, error, attr } = yield call(getReq, url);
    yield put(jobStatus(false));
    if (response) {
      yield all([
        put(setItems('userCollections', response)),
        put(setItemsAttr('userCollections', attr)),
      ]);
    } else {
      yield fork(handleCommonErr, error, GE_USER_COLLECTIONS, { url });
    }
  }
}

/**
 * get collection flow
 */
export function* getCollectionF(): any {
  while (true) {
    const { url, loadPhotos } = yield take(GE_COLLECTION);
    yield put(jobStatus(true));
    const { response, error } = yield call(getReq, url);
    yield put(jobStatus(false));
    if (response) {
      // set collection to store check loggedIn user is owner of this collection or
      // not
      const userId = getState().user.userProfile.id;
      if (userId && userId === response.user.id) {
        yield put(setItem('userCollections', response));
      } else {
        yield put(setItem('collections', response));
      }
      if (loadPhotos) {
        // get photos collection by link
        yield put(getCollectionPhotos(response.links.photos));
      }
    } else {
      yield fork(handleCommonErr, error, GE_COLLECTION, { url });
    }
  }
}

/**
 * get photos of collection flow
 */
export function* getCollectionPhotosF(): any {
  while (true) {
    const { url } = yield take(GE_COLLECTION_PHOTOS);
    yield put(jobStatus(true));
    const { response, error, attr } = yield call(getReq, url);
    yield put(jobStatus(false));
    if (response) {
      yield all([
        put(setItems('photos', response)),
        put(setItemsAttr('photos', attr)),
      ]);
    } else {
      yield fork(handleCommonErr, error, GE_COLLECTION_PHOTOS, { url });
    }
  }
}

/**
 * search in collection flow
 */
export function* searchInCollectionsF(): any {
  while (true) {
    const { url } = yield take(SEARCH_COLLECTIONS);
    yield put(jobStatus(true));
    const { response, error, attr } = yield call(getReq, url);
    yield put(jobStatus(false));
    if (response) {
      // https://unsplash.com/documentation#search-collections
      const { total, total_pages, results } = response;
      yield all([
        put(setItems('collections', results)),
        put(
          setItemsAttr('collections', {
            last: attr.last,
            next: attr.next,
            total,
            total_pages,
          })
        ),
      ]);
    } else {
      yield fork(handleCommonErr, error, SEARCH_COLLECTIONS, { url });
    }
  }
}

/**
 * create collection flow
 */
export function* createCollectionF(): any {
  while (true) {
    const { collection } = yield take(CREATE_COLLECTION);
    yield all([
      put(jobStatus(true)),
      put(startSubmit('add_or_edit_collection')),
    ]);
    const { response, error } = yield call(createCollection, collection);
    yield all([
      put(jobStatus(false)),
      put(stopSubmit('add_or_edit_collection')),
    ]);
    if (response) {
      // update the entity
      // NOTE: the user collection locate in userCollections
      yield put(setItem('userCollections', response));
      // get current search path in url if startsWith ?add_to_collection&id=
      const { search } = getHistory().location;
      const searchParams = new URLSearchParams(search);
      if (searchParams.has('step') && searchParams.has('id')) {
        // get id from url
        yield put(push(`?add_to_collection&id=${searchParams.get('id')}`));
      } else {
        yield put(push(`/collections/${response.id}`));
      }
    } else {
      yield fork(handleCommonErr, error, CREATE_COLLECTION, { collection });
    }
  }
}

/**
 * update collection flow
 */
export function* updateCollectionF(): any {
  while (true) {
    const { collection } = yield take(UPDATE_COLLECTION);
    yield all([
      put(jobStatus(true)),
      put(startSubmit('add_or_edit_collection')),
    ]);
    yield;
    const { response, error } = yield call(updateCollection, collection);
    yield all([
      put(jobStatus(false)),
      put(stopSubmit('add_or_edit_collection')),
    ]);
    if (response) {
      // update the entity
      // NOTE: the user collection locate in userCollections
      yield all([
        put(updateItem('userCollections', response)),
        put(push(`/collections/${response.id}`)),
      ]);
    } else {
      yield fork(handleCommonErr, error, UPDATE_COLLECTION, { collection });
    }
  }
}

/**
 * delete collection flow
 */
export function* deleteCollectionF(): any {
  while (true) {
    const { id } = yield take(DELETE_COLLECTION);
    yield put(jobStatus(true));
    const { response, error } = yield call(deleteCollection, id);
    yield put(jobStatus(false));
    if (response) {
      // update the entity
      // NOTE: the user collection locate in userCollections
      yield all([
        put(removeItem('userCollections', id)),
        put(push('/collections/')),
      ]);
    } else {
      yield fork(handleCommonErr, error, DELETE_COLLECTION, { id });
    }
  }
}

/**
 * add photo to collection flow
 */
export function* addPhotoToCollectionF(): any {
  while (true) {
    const { photoId, collectionId } = yield take(ADD_PHOTO_TO_COLLECTION);
    yield put(jobStatus(true));
    const { response, error } = yield call(
      addPhotoToCollection,
      photoId,
      collectionId
    );
    yield put(jobStatus(false));
    if (response) {
      // INFO: https://unsplash.com/documentation#add-a-photo-to-a-collection response
      // have photo and collection object update state for two items
      yield all([
        put(updateItem('userCollections', response.collection)),
        put(updateItem('photos', response.photo)),
      ]);
    } else {
      yield fork(handleCommonErr, error, ADD_PHOTO_TO_COLLECTION, {
        photoId,
        collectionId,
      });
    }
  }
}

/**
 * remove photo from collection flow
 */
export function* removePhotoFromCollectionF(): any {
  while (true) {
    const { photoId, collectionId } = yield take(REMOVE_PHOTO_FROM_COLLECTION);
    yield put(jobStatus(true));
    const { response, error } = yield call(
      removePhotoFromCollection,
      photoId,
      collectionId
    );
    yield put(jobStatus(false));
    if (response) {
      // INFO: https://unsplash.com/documentation#remove-a-photo-from-a-collection
      // response have photo and collection object update state for two items
      yield all([
        put(updateItem('userCollections', response.collection)),
        put(updateItem('photos', response.photo)),
      ]);
    } else {
      yield fork(handleCommonErr, error, ADD_PHOTO_TO_COLLECTION, {
        photoId,
        collectionId,
      });
    }
  }
}
