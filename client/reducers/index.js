import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import app from './app';
import user from './user';
import photo from './photo';
import {CL_STORE} from '../constants/action-types';

// combine multiple reducers
const appReducer = combineReducers({
  // you can add many reducer
  app,
  user,
  // Add the reducer to your store on the `router` key
  photo,
  router: routerReducer
});

const rootReducer = (state, action) => {
  let newState = state;
  // handle CL_STORE
  if (action.type === CL_STORE) {
    // return state with router
    const {router} = state;
    newState = {
      router
    };
  }
  return appReducer(newState, action);
};

export default rootReducer;