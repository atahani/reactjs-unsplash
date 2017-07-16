import {getReq} from './rest-helper';

/**
 * get photos
 * @param {string} url url of get photo request
 */
export const getPhotos = url => getReq(url);