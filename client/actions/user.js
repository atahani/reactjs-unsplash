import {GE_ACCESS_TOKEN, SE_ACCESS_TOKEN, LOGOUT} from '../constants/action-types';
/**
 * get access token with authorization code
 * @param {string} code string
 */
export const getAccessToken = code => ({type: GE_ACCESS_TOKEN, code});

/**
 * set access_token and other field
 * @param {object} payload object of authorize token response
 */
export const setAccessToken = payload => ({type: SE_ACCESS_TOKEN, payload});

/**
 * logout user
 */
export const logout = () => ({type: LOGOUT});