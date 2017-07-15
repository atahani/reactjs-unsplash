import {getState} from '../store';
import {UN_AVAILABLE} from '../constants/api-error-codes';

// check status used in fetch promise
function checkStatus(json, res) {
  // check response in ok 200 or not
  if (res.ok) {
    return {response: json};
  }
  // create error with status text, message, code
  const error = new Error(res.status);
  error.code = res.status;
  error.errors = json.errors;
  error.description = json.error_description;
  throw error;
}

// handle failure error
function failure(err) {
  // handle server unavailable error
  if (typeof err === 'object' && err.message === 'Failed to fetch') {
    const error = new Error('server unavailable');
    error.errors = ['server unavailable'];
    error.code = UN_AVAILABLE;
    return {error};
  }
  return {error: err};
}

/**
 * get headers of REST API request
 * add headers like Accept, Authorization, Content-Type
 * @param {bool} jsonContentType
 */
export const getHeaders = (jsonContentType = true) => {
  const headers = new Headers();
  headers.append('Accept-Version', 'v1');
  if (jsonContentType) {
    headers.append('Content-Type', 'application/json');
  }
  headers.append('Accept', 'application/json');
  if (getState().user.is_authorized) {
    headers.append('Authorization', `bearer ${getState().user.token.access_token}`);
  }
  return headers;
};

/**
 * get headers for Multi Part requests
 * like upload image
 */
export const getHeadersForMultiPart = () => {
  const headers = new Headers();
  if (getState().user.is_authorized) {
    headers.append('Authorization', `Bearer ${getState().user.token.access_token}`);
  }
  return headers;
};

/**
 * post request
 * @param {string} endpoint
 * @param {Object} body
 * @param {Headers} headers default is getHeaders()
 */
export const postReq = (endpoint, body, headers = getHeaders()) => fetch(endpoint, {
  method: 'POST',
  body: JSON.stringify(body),
    headers
  })
  .then(res => res.json().then(json => ({json, res})))
  .then(({json, res}) => checkStatus(json, res))
  .catch(failure);

/**
 * post form for multipart requests
 * like upload image
 * @param {string} endpoint
 * @param {Object} formData
 */
export const postReqFormData = (endpoint, formData) => fetch(endpoint, {
    method: 'POST',
    body: formData,
    headers: getHeadersForMultiPart()
  })
  .then(res => res.json().then(json => ({json, res})))
  .then(({json, res}) => checkStatus(json, res))
  .catch(failure);

/**
 * get request
 * @param {string} endpoint
 * @param {Headers} headers default is getHeaders()
 */
export const getReq = (endpoint, headers = getHeaders()) => fetch(endpoint, {
    method: 'GET',
    headers
  })
  .then(res => res.json().then(json => ({json, res})))
  .then(({json, res}) => checkStatus(json, res))
  .catch(failure);

/**
 * delete request
 * @param {string} endpoint
 * @param {Headers} headers default is getHeaders()
 */
export const deleteReq = (endpoint, body = {}, headers = getHeaders()) => fetch(endpoint, {
  method: 'DELETE',
  body: JSON.stringify(body),
    headers
  })
  .then(res => res.json().then(json => ({json, res})))
  .then(({json, res}) => checkStatus(json, res))
  .catch(failure);

/**
 * delete request without get json in response
 * @param {string} endpoint
 * @param {Headers} headers default is getHeaders()
 */
export const deleteReqWithoutJSON = (endpoint, headers = getHeaders()) => fetch(endpoint, {
  method: 'DELETE',
  headers
}).then(res => checkStatus({}, res)).catch(failure);

/**
 * put request
 * usually for update requests
 * @param {string} endpoint
 * @param {Object} body
 * @param {Headers} headers default is getHeaders()
 */
export const putReq = (endpoint, body, headers = getHeaders()) => fetch(endpoint, {
  method: 'PUT',
  body: JSON.stringify(body),
    headers
  })
  .then(res => res.json().then(json => ({json, res})))
  .then(({json, res}) => checkStatus(json, res))
  .catch(failure);