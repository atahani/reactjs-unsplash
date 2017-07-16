import {postReq, putReq} from './rest-helper';
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