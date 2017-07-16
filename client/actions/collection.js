import {GE_USER_COLLECTIONS} from '../constants/action-types';

/**
 * get user collections
 * @param {string} url the url of request
 */
export const getUserCollections = url => ({type: GE_USER_COLLECTIONS, url});