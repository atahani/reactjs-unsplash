import {postReq, putReq, deleteReqWithoutJSON} from './rest-helper';
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