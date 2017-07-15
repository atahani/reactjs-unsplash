import { SE_LAST_PATH_NAME } from '../constants/action-types';

/**
 * set last path_name
 * used in router/LOCATION_CHANGE action middleware
 * @param {string} pathName 
 */
export const setLastPathName = pathName => ({
  type: SE_LAST_PATH_NAME,
  pathName,
});