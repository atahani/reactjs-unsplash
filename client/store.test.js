import configureStore from 'redux-mock-store';
import {setLastPathName} from './actions/app';
import {SE_LAST_PATH_NAME} from './constants/action-types';
import appReducer from './reducers/app';

/**
 * http://arnaudbenard.com/redux-mock-store/
 * http://redux.js.org/docs/recipes/WritingTests.html
 */
describe('test and dispatch the actions to store', () => {

  it('dispatch the setLastPathName action to store', () => {
    const mockStore = configureStore([]);
    const store = mockStore({});
    store.replaceReducer(appReducer);

    store.dispatch(setLastPathName('/auth'));

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: SE_LAST_PATH_NAME,
        pathName: '/auth'
      }
    ]);

  });
});