//@flow

import type {
  RESTAPIResponse,
  ErrorResponse,
  SuccessResponse,
} from '../types/data';
import APIError from './api-error';
import { getState } from '../store';
import { UN_AVAILABLE, UNHANDLED } from '../constants/api-error-codes';

// check status used in fetch promise
function checkStatus(
  json: any,
  res: Response
): ErrorResponse | SuccessResponse {
  // check response in ok 200 or not
  if (res.ok) {
    // get link header from response
    /**
     * 200 OK
     * Link: <https://api.unsplash.com/users/ashbot/likes>; rel="first", <https://api.unsplash.com/photos/users/ashbot/likes?page=1>; rel="prev", <https://api.unsplash.com/photos/users/ashbot/likes?page=5>; rel="last", <https://api.unsplash.com/photos/users/ashbot/likes?page=3>; rel="next"
     * X-Ratelimit-Limit: 1000
     * X-Ratelimit-Remaining: 999
     */
    const attr = {};
    let linkHeader = res.headers.get('link');
    if (linkHeader) {
      linkHeader = linkHeader.replace(/[<|>|"| ]/g, '').replace(/rel=/g, '');
      const links = linkHeader.split(',');
      links.forEach(item => {
        const part = item.split(';');
        if (part.length === 2) {
          Object.defineProperty(attr, part[1].trim(), {
            value: part[0].trim(),
            writable: false,
            enumerable: false,
          });
        }
      });
    }
    return { response: json, attr };
  }
  // create error with status text, message, code
  const error = new APIError(res.status);
  error.code = res.status;
  error.errors = json.errors;
  error.description = json.error_description;
  return { error };
}

// handle failure error
function failure(err: Error): ErrorResponse {
  // handle server unavailable error
  if (err.message && err.message === 'Failed to fetch') {
    const error = new APIError('server unavailable');
    error.errors = 'server unavailable';
    error.code = UN_AVAILABLE;
    return { error };
  } else {
    const error = new APIError('unhandled error happend');
    error.errors = 'unhandled error happend';
    error.code = UNHANDLED;
    return { error };
  }
}

/**
 * get headers of REST API request
 * add headers like Accept, Authorization, Content-Type
 * @param {bool} jsonContentType
 */
export const getHeaders = (jsonContentType?: boolean = true): Headers => {
  const headers = new Headers();
  headers.append('Accept-Version', 'v1');
  if (jsonContentType) {
    headers.append('Content-Type', 'application/json');
  }
  headers.append('Accept', 'application/json');
  if (getState().user.isAuthorized) {
    headers.append(
      'Authorization',
      `Bearer ${getState().user.token.access_token}`
    );
  }
  return headers;
};

/**
 * get headers for Multi Part requests
 * like upload image
 */
export const getHeadersForMultiPart = (): Headers => {
  const headers = new Headers();
  if (getState().user.isAuthorized) {
    headers.append(
      'Authorization',
      `Bearer ${getState().user.token.access_token}`
    );
  }
  return headers;
};

/**
 * post request
 * @param {string} endpoint
 * @param {Object} body
 * @param {Headers} headers default is getHeaders()
 */
export const postReq = (
  endpoint: string,
  body: any,
  headers?: Headers = getHeaders()
): RESTAPIResponse =>
  fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  })
    .then(res => res.json().then(json => ({ json, res })))
    .then(({ json, res }) => checkStatus(json, res))
    .catch(failure);

/**
 * post form for multipart requests
 * like upload image
 * @param {string} endpoint
 * @param {Object} formData
 */
export const postReqFormData = (
  endpoint: string,
  formData: any
): RESTAPIResponse =>
  fetch(endpoint, {
    method: 'POST',
    body: formData,
    headers: getHeadersForMultiPart(),
  })
    .then(res => res.json().then(json => ({ json, res })))
    .then(({ json, res }) => checkStatus(json, res))
    .catch(failure);

/**
 * get request
 * @param {string} endpoint
 * @param {Headers} headers default is getHeaders()
 */
export const getReq = (
  endpoint: string,
  headers?: Headers = getHeaders()
): RESTAPIResponse =>
  fetch(endpoint, {
    method: 'GET',
    headers,
  })
    .then(res => res.json().then(json => ({ json, res })))
    .then(({ json, res }) => checkStatus(json, res))
    .catch(failure);

/**
 * delete request
 * @param {string} endpoint
 * @param {Headers} headers default is getHeaders()
 */
export const deleteReq = (
  endpoint: string,
  body: any = {},
  headers?: Headers = getHeaders()
): RESTAPIResponse =>
  fetch(endpoint, {
    method: 'DELETE',
    body: JSON.stringify(body),
    headers,
  })
    .then(res => res.json().then(json => ({ json, res })))
    .then(({ json, res }) => checkStatus(json, res))
    .catch(failure);

/**
 * delete request without get json in response
 * @param {string} endpoint
 * @param {Headers} headers default is getHeaders()
 */
export const deleteReqWithoutJSON = (
  endpoint: string,
  headers?: Headers = getHeaders()
): RESTAPIResponse =>
  fetch(endpoint, {
    method: 'DELETE',
    headers,
  })
    .then(res => checkStatus({}, res))
    .catch(failure);

/**
 * put request
 * usually for update requests
 * @param {string} endpoint
 * @param {Object} body
 * @param {Headers} headers default is getHeaders()
 */
export const putReq = (
  endpoint: string,
  body: any,
  headers?: Headers = getHeaders()
): RESTAPIResponse =>
  fetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers,
  })
    .then(res => res.json().then(json => ({ json, res })))
    .then(({ json, res }) => checkStatus(json, res))
    .catch(failure);
