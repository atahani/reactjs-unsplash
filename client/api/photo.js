import {getReq, postReq, deleteReq} from './rest-helper';
import { API_ROOT } from '../constants/service-info';

/**
 * get photos
 * @param {string} url url of get photo request
 */
export const getPhotos = url => getReq(url);

/**
 * like photo
 * @param {string} id photo id
 */
export const likePhoto = id => postReq(`${API_ROOT}/photos/${id}/like`);

/**
 * unlike photo
 * @param {string} id photo id
 */
export const unLikePhoto = id => deleteReq(`${API_ROOT}/photos/${id}/like`);