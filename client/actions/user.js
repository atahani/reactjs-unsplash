// @flow

import type { Action } from '../types';
import type { AuthorizeToken, UserProfile } from '../types/data';

/**
 * get access token with authorization code
 * @param {string} code string
 */
export const getAccessToken = (code: string): Action => ({type: 'user/GE_ACCESS_TOKEN', code});

/**
 * set access_token and other field
 * @param {AuthorizeToken} AuthorizeToken
 */
export const setAccessToken = (payload: AuthorizeToken): Action => ({type: 'user/SE_ACCESS_TOKEN', payload});

/**
 * logout user
 */
export const logout = (): Action => ({type: 'user/LOGOUT'});

/**
 * get logged in user profile
 */
export const getProfile = (): Action => ({type: 'user/GE_USER_PROFILE'});

/**
 * set logged in user profile
 * @param {object} payload
 */
export const setProfile = (payload: UserProfile): Action => ({type: 'user/SE_USER_PROFILE', payload});