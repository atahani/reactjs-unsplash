import {GE_USER_COLLECTIONS, GE_COLLECTION, GE_COLLECTION_PHOTOS, SEARCH_COLLECTIONS} from '../constants/action-types';

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