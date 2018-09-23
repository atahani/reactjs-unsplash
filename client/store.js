//@flow

//$FlowFixMe we should import Node as type but the eslint doesn't happy
import {createStore, applyMiddleware, compose,Store} from 'redux';
import {createBrowserHistory, History} from 'history';
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware, {END} from 'redux-saga';
import {persistStore} from 'redux-persist';
import reducers from './reducers';
import {setLastPathName} from './actions/app';
import type { Action } from './types';

// define it as gloabl variable
let currentStore: Store<*,*>;
let isStoreConfigure: boolean = false;
const middlewares = [];

// create history for routeMiddleware
const history: History = createBrowserHistory();

// create saga middleware to handle async flow
const sagaMiddleware = createSagaMiddleware();

/**
 * START
 * middlewares config
 */

export const locationChangeMiddleware = () => (next: any) => (action: Action) => {
  // handle change location action
  if (action.type === '@@router/LOCATION_CHANGE' && !action.payload.pathname.startsWith('/collections/new') 
            && !action.payload.pathname.startsWith('/collections/edit')) {
    // dispatch action to change in lastPathname in app state
    currentStore.dispatch(setLastPathName(action.payload.pathname));
  }
  next(action);
};

middlewares.push(sagaMiddleware);

// simple middleware to store handle LOCATION_CHANGE action and change
// lastPathname in app state
middlewares.push(locationChangeMiddleware);

// build the middleware for intercepting and dispatching navigation actions
middlewares.push(routerMiddleware(history));

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
export const configureStore = (initialState: any): Promise<*> => new Promise((resolve, reject) => {
  try {
    // create store
    currentStore = createStore(reducers, initialState, customCompose,);
    //$FlowFixMe
    currentStore.runSaga = sagaMiddleware.run;
    //$FlowFixMe
    currentStore.close = () => currentStore.dispatch(END);
    persistStore(currentStore, null, () => {
      isStoreConfigure = true;
      resolve(currentStore);
    });
  } catch (e) {
    reject(e);
  }
});

/**
 * set current store
 * @param {object} store redux store
 */
export const setAsCurrentStore = (store: Store<*,*>) => {
  currentStore = store;
  isStoreConfigure = true;
  if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
    window.store = currentStore;
  }
};

/**
 * get current store
 * can use for dispatch action
 * getStore().dispatch()
 */
export const getStore = (): Store<*,*> => currentStore;

/**
 * get history
 */
export const getHistory = (): History => history;

/**
 * get current state
 */
export const getState = () => currentStore.getState();

/** 
 * store has been configured
 */
export const storeHasBeenConfigured = () => isStoreConfigure;