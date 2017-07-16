import {
  GE_USER_COLLECTIONS,
  GE_COLLECTION,
  GE_COLLECTION_PHOTOS,
  SEARCH_COLLECTIONS,
  CREATE_COLLECTION,
  UPDATE_COLLECTION,
  DELETE_COLLECTION
} from '../constants/action-types';

/**
 * get user collections
 * @param {string} url the url of request
 */
export const getUserCollections = url => ({type: GE_USER_COLLECTIONS, url});

/**
 * get one collection
 * @param {string} url url request
 */
export const getCollection = (url, loadPhotos = false) => ({type: GE_COLLECTION, url, loadPhotos});

/**
 * get photos of collection
 * @param {string} url url request
 */
export const getCollectionPhotos = url => ({type: GE_COLLECTION_PHOTOS, url});

/**
 * search in collections
 * @param {string} url url for search request
 */
export const searchInCollections = url => ({type: SEARCH_COLLECTIONS, url});

/**
 * create collection
 * @param {object} values object of collection form form
 */
export const createCollection = values => ({type: CREATE_COLLECTION, values});

/**
 * update collection
 * @param {string} id collection id
 * @param {*} values object of collection from form
 */
export const updateCollection = (id, values) => ({type: UPDATE_COLLECTION, id, values});