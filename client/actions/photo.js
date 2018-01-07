// @flow

import type { Action } from '../types';

/**
 * url request for photos
 * @param {string} url request url for get photos
 */
export const getPhotos = (url: string): Action => ({type: 'photo/GE_PHOTOS', url});

/**
 * like photo via id
 * @param {string} id photo id
 */
export const likePhoto = (id: string): Action => ({type: 'photo/LIKE_PHOTO', id});

/**
 * unlike photo via id
 * @param {string} id photo id
 */
export const unLikePhoto = (id: string): Action => ({type: 'photo/UNLIKE_PHOTO', id});

/**
 * search in photos
 * @param {string} url request url for search in photos
 */
export const searchInPhotos = (url: string): Action => ({type: 'photo/SEARCH_PHOTOS', url});

/**
 * get photo by id
 * @param {strin} id get photo
 */
export const getPhoto = (id: string): Action => ({type: 'photo/GE_PHOTO', id});