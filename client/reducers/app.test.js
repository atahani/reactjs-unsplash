import appReducer from './app';
import {setLastPathName, jobStatus, setActionData} from '../actions/app';

describe('appReducer', () => {
  it('should return the initial state', () => {
    expect(appReducer(void 0, {})).toMatchObject({actionData: {}, jobRunning: 0, lastPathname: '/'});
  });
  it('should react to SE_LAST_PATH_NAME action', () => {
    expect(appReducer(void 0, setLastPathName('/auth'))).toMatchObject({actionData: {}, jobRunning: 0, lastPathname: '/auth'});
  });
  it('should react to CH_JOB_ST actoin', () => {
    expect(appReducer(void 0, jobStatus(true))).toMatchObject({actionData: {}, jobRunning: 1, lastPathname: '/'});
    expect(appReducer({
      actionData: {},
      jobRunning: 1,
      lastPathname: '/'
    }, jobStatus(false))).toMatchObject({actionData: {}, jobRunning: 0, lastPathname: '/'});
  });
  it('should react to SE_ACTION_DATA', () => {
    expect(appReducer({
      actionData: {}
    }, setActionData('confirmDeleteCollection', true))).toMatchObject({
      actionData: {
        confirmDeleteCollection: true
      }
    });
  });
});