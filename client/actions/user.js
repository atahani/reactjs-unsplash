import {GE_ACCESS_TOKEN, SE_ACCESS_TOKEN, LOGOUT, GE_USER_PROFILE, SE_USER_PROFILE} from '../constants/action-types';
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

/**
 * get logged in user profile
 */
export const getProfile = () => ({type: GE_USER_PROFILE});

/**
 * set logged in user profile
 * @param {object} payload
 */
export const setProfile = payload => ({type: SE_USER_PROFILE, payload});