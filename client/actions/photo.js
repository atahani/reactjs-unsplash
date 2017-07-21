import {GE_PHOTOS} from '../constants/action-types';

/**
 * url request for photos
 * @param {string} url request url for get photos
 */
export const getPhotos = url => ({type: GE_PHOTOS, url});