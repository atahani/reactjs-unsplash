import {postReq, putReq, deleteReqWithoutJSON, deleteReq} from './rest-helper';
import {API_ROOT} from '../constants/service-info';

/**
 * create collection request
 * @param {object} values collection values from form
 */
export const createCollection = values => postReq(`${API_ROOT}/collections`, {
  ...values
});

/**
 * update collection request
 * @param {string} id collection id
 * @param {*} values collection values form form
 */
export const updateCollection = (id, values) => putReq(`${API_ROOT}/collections/${id}`, {
  ...values
});

/**
 * delete collection by id
 * @param {string} id collection id
 */
export const deleteCollection = id => deleteReqWithoutJSON(`${API_ROOT}/collections/${id}`);

/**
 * add photo to collection
 * @param {string} photoId photo id
 * @param {number} collectionId collection id
 */
export const addPhotoToCollection = (photoId, collectionId) => postReq(`${API_ROOT}/collections/${collectionId}/add`, {photo_id: photoId});

/**
 * remove photo from collection
 * @param {string} photoId photo id
 * @param {number} collectionId collection id
 */
export const removePhotoFromCollection = (photoId, collectionId) => deleteReq(`${API_ROOT}/collections/${collectionId}/remove`, {photo_id: photoId});