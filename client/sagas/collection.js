/*eslint-disable no-constant-condition*/
import { take, put, call, fork, all, } from 'redux-saga/effects';
import { handleCommonErr } from './app';
import { jobStatus, } from '../actions/app';
import { getReq } from '../api/rest-helper';
import { setItems, setItemsAttr } from '../actions/items';
import { GE_USER_COLLECTIONS} from '../constants/action-types';

/**
 * get user collections flow
 */
export function* getUserCollectionsF() {
  while (true) {
    const {url} = yield take(GE_USER_COLLECTIONS);
    yield put(jobStatus(true));
    const {response, error, attr} = yield call(getReq, url);
    yield put(jobStatus(false));
    if (response) {
      yield all([
        put(setItems('user_collections', response)),
        put(setItemsAttr('user_collections', attr)),
      ]);
    } else {
      yield fork(handleCommonErr, error, GE_USER_COLLECTIONS, {
        url,
      });
    }
  }
}