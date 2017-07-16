import {GE_PHOTOS, SE_PHOTOS} from '../constants/action-types';

/**
 * url request for photos
 * @param {string} url request url for get photos
 */
export const getPhotos = url => ({type: GE_PHOTOS, url});

/**
 * set photos
 * @param {array} payload array of photos
 */
export const setPhotos = payload => ({type: SE_PHOTOS, payload});