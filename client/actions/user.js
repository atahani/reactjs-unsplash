import {GE_ACCESS_TOKEN} from '../constants/action-types';
/**
 * get access token with authorization code
 * @param {string} code string
 */
export const getAccessToken = code => ({type: GE_ACCESS_TOKEN, code});