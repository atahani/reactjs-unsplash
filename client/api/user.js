import {postReq, getHeaders} from './rest-helper';
import {ROOT_URL, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI} from '../constants/service-info';

/**
 * get access token from authorization code
 * @param {string} code authorization code that get in login action
 */
export const getAccessToken = code => postReq(`${ROOT_URL}/oauth/token`, {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  redirect_uri: REDIRECT_URI,
  code,
  grant_type: 'authorization_code'
}, getHeaders());