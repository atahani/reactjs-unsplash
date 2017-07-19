import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// combine multiple reducers
const appReducer = combineReducers({
  // you can add many reducer like
  // app,
  // Add the reducer to your store on the `router` key
  router: routerReducer,
});

export default appReducer;