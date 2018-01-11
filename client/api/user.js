//@flow

import type { RESTAPIResponse } from '../types/data';
import {postReq, getHeaders, getReq} from './rest-helper';
import {ROOT_URL, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, API_ROOT} from '../constants/service-info';

/**
 * get access token from authorization code
 * @param {string} code authorization code that get in login action
 */
export const getAccessToken = (code: string): RESTAPIResponse  => postReq(`${ROOT_URL}/oauth/token`, {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  redirect_uri: REDIRECT_URI,
  code,
  grant_type: 'authorization_code'
}, getHeaders());

/**
 * get the logged in user
 * MORE INFO: https://unsplash.com/documentation#get-the-users-profile
 */
export const getUserProfile = (): RESTAPIResponse => getReq(`${API_ROOT}/me`);