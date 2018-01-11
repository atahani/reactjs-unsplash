//@flow

import {postReq, putReq, deleteReqWithoutJSON, deleteReq} from './rest-helper';
import {API_ROOT} from '../constants/service-info';
import type { Collection, RESTAPIResponse } from '../types/data';

/**
 * create collection request
 * @param {collection} new collection object
 */
export const createCollection = (collection: Collection): RESTAPIResponse => postReq(`${API_ROOT}/collections`, {
  title: collection.title,
  description: collection.description,
  private: collection.private,
});

/**
 * update collection request
 * @param {string} id collection id
 * @param {collection} collection object
 */
export const updateCollection = (id: string, collection: Collection): RESTAPIResponse => putReq(`${API_ROOT}/collections/${id}`, {
  title: collection.title,
  description: collection.description,
  private: collection.private,
});

/**
 * delete collection by id
 * @param {string} id collection id
 */
export const deleteCollection = (id: string): RESTAPIResponse => deleteReqWithoutJSON(`${API_ROOT}/collections/${id}`);

/**
 * add photo to collection
 * @param {string} photoId photo id
 * @param {number} collectionId collection id
 */
export const addPhotoToCollection = (photoId: string, collectionId: string): RESTAPIResponse => postReq(`${API_ROOT}/collections/${collectionId}/add`, {photo_id: photoId});

/**
 * remove photo from collection
 * @param {string} photoId photo id
 * @param {number} collectionId collection id
 */
export const removePhotoFromCollection = (photoId: string, collectionId: string): RESTAPIResponse => deleteReq(`${API_ROOT}/collections/${collectionId}/remove`, {photo_id: photoId});