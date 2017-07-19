import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

// define it as gloabl variable
let currentStore = null;
const middlewares = [];

// create history for routeMiddleware
const history = createBrowserHistory();

/**
 * START
 * middlewares config 
 */

// build the middleware for intercepting and dispatching navigation actions
middlewares.push(routerMiddleware(history));

// add middlewares only in development mode
if (process.env.NODE_ENV === 'development') {
  // add redux-logger to middlewares
  middlewares.push(createLogger());
}

/**
 * END
 * middlewares config 
 */


/**
 * config compose
 * START
 */

/**
 * config compose with middlewares
 */
let customCompose = compose(applyMiddleware(...middlewares));

// wrap customCompose by composeWithDevTools with configs to enable redux dev tools
if (process.env.NODE_ENV === 'development') {
  // this is for redux dev tools
  const composeEnhancers = composeWithDevTools({
    // specify here name, actionsBlacklist, actionsCreators and other options if needed
  });
  customCompose = composeEnhancers(customCompose);
}

/**
 * config compose
 * END
 */

/**
 * configure store with initial state
 * NOTE: since the persist store take for a while use from Promise to configureStore
 * @param {object} initialState initial state can set by windows --app-initial
 */
export const configureStore = initialState => {
  currentStore = createStore(
      reducers,
      initialState,
      customCompose,
    );
  return currentStore;
};

/**
 * set current store
 * @param {object} store redux store
 */
export const setAsCurrentStore = store => {
  currentStore = store;
  if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
    window.store = currentStore;
  }
};

/**
 * get current store 
 * can use for dispatch action
 * getStore().dispatch()
 */
export const getStore = () => currentStore;

/**
 * get history
 */
export const getHistory = () => history;

/**
 * get current state
 */
export const getState = () => currentStore.getState();