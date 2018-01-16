// @flow

import type { Action } from '../types';

/**
 * set last path_name
 * used in router/LOCATION_CHANGE action middleware
 * @param {string} pathName
 */
export const setLastPathName = (pathName: string): Action => ({type: 'app/SE_LAST_PATH_NAME', pathName});

/**
 * clear the store
 * used in LOGOUT
 */
export const clearStore = (): Action => ({type: 'app/CL_STORE'});

/**
 * change job status for aync actions like get data from server
 * it's used for main progress bar in app
 * @param {bool} status
 */
export const jobStatus = (status: boolean = false): Action => ({type: 'app/CH_JOB_ST', status});

/**
 * custom action data with actionType
 * used for single action data like error or data in async actions
 * @param {string} actionType
 * @param {any} data
 */
export const setActionData = (actionType: string, data: ?any): Action => 
      ({type: 'app/SE_ACTION_DATA', actionType, data});

export const setSearchValues = (query: string = '', title: string = '', value: string = ''): Action => 
      ({type: 'app/SE_SEARCH_VALUES',query,title,value});
