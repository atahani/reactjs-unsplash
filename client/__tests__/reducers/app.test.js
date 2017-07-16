import appReducer from '../../reducers/app';
import {setLastPathName, jobStatus, setActionData} from '../../actions/app';

describe('appReducer', () => {
  it('should return the initial state', () => {
    expect(appReducer(void 0, {})).toMatchObject({action_data: {}, job_running: 0, last_pathname: '/'});
  });
  it('should react to SE_LAST_PATH_NAME action', () => {
    expect(appReducer(void 0, setLastPathName('/auth'))).toMatchObject({action_data: {}, job_running: 0, last_pathname: '/auth'});
  });
  it('should react to CH_JOB_ST actoin', () => {
    expect(appReducer(void 0, jobStatus(true))).toMatchObject({action_data: {}, job_running: 1, last_pathname: '/'});
    expect(appReducer({
      action_data: {},
      job_running: 1,
      last_pathname: '/'
    }, jobStatus(false))).toMatchObject({action_data: {}, job_running: 0, last_pathname: '/'});
  });
  it('should react to SE_ACTION_DATA', () => {
    expect(appReducer({
      action_data: {}
    }, setActionData('confirm_delete_collection', true))).toMatchObject({
      action_data: {
        confirm_delete_collection: true
      }
    });
  });
});