// @flow

import type { Action } from '../types';
import type { Collection } from '../types/data';

/**
 * get user collections
 * @param {string} url the url of request
 */
export const getUserCollections = (url: string): Action => ({
  type: 'collection/GE_USER_COLLECTIONS',
  url,
});

/**
 * get one collection
 * @param {string} url url request
 */
export const getCollection = (
  url: string,
  loadPhotos: boolean = false
): Action => ({ type: 'collection/GE_COLLECTION', url, loadPhotos });

/**
 * get photos of collection
 * @param {string} url url request
 */
export const getCollectionPhotos = (url: string): Action => ({
  type: 'collection/GE_COLLECTION_PHOTOS',
  url,
});

/**
 * search in collections
 * @param {string} url url for search request
 */
export const searchInCollections = (url: string): Action => ({
  type: 'collection/SEARCH_COLLECTIONS',
  url,
});

/**
 * create collection
 * @param {collection} collection object
 */
export const createCollection = (collection: Collection): Action => ({
  type: 'collection/CREATE_COLLECTION',
  collection,
});

/**
 * update collection
 * @param {Collection} collection object of collection from form
 */
export const updateCollection = (collection: Collection): Action => ({
  type: 'collection/UPDATE_COLLECTION',
  collection,
});

/**
 * delete collection
 * @param {string} id collection id
 */
export const deleteCollection = (id: string): Action => ({
  type: 'collection/DELETE_COLLECTION',
  id,
});

/**
 * add photo to collection
 * @param {number} collectionId collection id
 * @param {string} photoId photo id
 */
export const addPhotoToCollection = (
  collectionId: string,
  photoId: string
): Action => ({
  type: 'collection/ADD_PHOTO_TO_COLLECTION',
  collectionId,
  photoId,
});

/**
 * remove photo from collection
 * @param {number} collectionId collection id
 * @param {string} photoId photo id
 */
export const removePhotoFromCollection = (
  collectionId: string,
  photoId: string
): Action => ({
  type: 'collection/REMOVE_PHOTO_FROM_COLLECTION',
  collectionId,
  photoId,
});
