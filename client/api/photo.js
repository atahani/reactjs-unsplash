//@flow

import type { RESTAPIResponse } from '../types/data';
import {getReq, postReq, deleteReq} from './rest-helper';
import {API_ROOT} from '../constants/service-info';

/**
 * get photos
 * @param {string} url url of get photo request
 */
export const getPhotos = (url: string): RESTAPIResponse => getReq(url);

/**
 * like photo
 * @param {string} id photo id
 */
export const likePhoto = (id: string): RESTAPIResponse => postReq(`${API_ROOT}/photos/${id}/like`);

/**
 * unlike photo
 * @param {string} id photo id
 */
export const unLikePhoto = (id: string): RESTAPIResponse => deleteReq(`${API_ROOT}/photos/${id}/like`);

/**
 * get photo by id
 * @param {string} id photo it
 */
export const getPhoto = (id: string): RESTAPIResponse => getReq(`${API_ROOT}/photos/${id}`);