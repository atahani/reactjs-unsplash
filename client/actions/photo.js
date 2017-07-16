import {GE_PHOTOS, LIKE_PHOTO, UNLIKE_PHOTO, SEARCH_PHOTOS} from '../constants/action-types';

/**
 * url request for photos
 * @param {string} url request url for get photos
 */
export const getPhotos = url => ({type: GE_PHOTOS, url});

/**
 * like photo via id
 * @param {string} id photo id
 */
export const likePhoto = id => ({type: LIKE_PHOTO, id});

/**
 * unlike photo via id
 * @param {string} id photo id
 */
export const unLikePhoto = id => ({type: UNLIKE_PHOTO, id});

/**
 * search in photos
 * @param {string} url request url for search in photos
 */
export const searchInPhotos = url => ({type: SEARCH_PHOTOS, url});