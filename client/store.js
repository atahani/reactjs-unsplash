import {createStore, applyMiddleware, compose} from 'redux';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware, {END} from 'redux-saga';
import {persistStore, autoRehydrate} from 'redux-persist';
import reducers from './reducers';
import {setLastPathName} from './actions/app';

// define it as gloabl variable
let currentStore = null;
const middlewares = [];

// create history for routeMiddleware
const history = createBrowserHistory();

// create saga middleware to handle async flow
const sagaMiddleware = createSagaMiddleware();

/**
 * START
 * middlewares config
 */

export const locationChangeMiddleware = () => next => action => {
  // handle change location action
  if (action.type === '@@router/LOCATION_CHANGE' && !action.payload.pathname.startsWith('/collections/new') && !action.payload.pathname.startsWith('/collections/edit')) {
    // dispatch action to change in last_pathname in app state
    currentStore.dispatch(setLastPathName(action.payload.pathname));
  }
  next(action);
};

middlewares.push(sagaMiddleware);

// simple middleware to store handle LOCATION_CHANGE action and change
// last_pathname in app state
middlewares.push(locationChangeMiddleware);

// build the middleware for intercepting and dispatching navigation actions
middlewares.push(routerMiddleware(history));

// add middlewares only in development mode
if (process.env.NODE_ENV === 'development') {
  // add redux-logger to middlewares
  const reduxLogger = require('redux-logger');
  middlewares.push(reduxLogger.createLogger());
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
 * autoRehydrate for redux-persist store state in localStorage
 */
let customCompose = compose(applyMiddleware(...middlewares), autoRehydrate());

// wrap customCompose by composeWithDevTools with configs to enable redux dev
// tools
if (process.env.NODE_ENV === 'development') {
  const reduxDevTool = require('redux-devtools-extension');
  // this is for redux dev tools
  const composeEnhancers = reduxDevTool.composeWithDevTools({
    // specify here name, actionsBlacklist, actionsCreators and other options if
    // needed
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
export const configureStore = initialState => new Promise((resolve, reject) => {
  try {
    // create store
    currentStore = createStore(reducers, initialState, customCompose,);
    currentStore.runSaga = sagaMiddleware.run;
    currentStore.close = () => currentStore.dispatch(END);
    persistStore(currentStore, {
      // since use from whitelist other ignored blacklist: ['app'],
      whitelist: ['user']
    }, () => resolve(currentStore));
  } catch (e) {
    reject(e);
  }
});

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