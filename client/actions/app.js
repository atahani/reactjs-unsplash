import {SE_LAST_PATH_NAME, CL_STORE, CH_JOB_ST} from '../constants/action-types';

/**
 * set last path_name
 * used in router/LOCATION_CHANGE action middleware
 * @param {string} pathName
 */
export const setLastPathName = pathName => ({type: SE_LAST_PATH_NAME, pathName});

/**
 * clear the store
 * used in LOGOUT
 */
export const clearStore = () => ({type: CL_STORE});

/**
 * change job status for aync actions like get data from server
 * it's used for main progress bar in app
 * @param {bool} status
 */
export const jobStatus = (status = false) => ({type: CH_JOB_ST, status});