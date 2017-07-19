import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';

// action type as constants
export const INCREMENT = 'INCREMENT';

const initialState = {
  count: 0
};
/**
 * reducer
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return Object.assign({}, state, {
        count: state.count + 1
      });
    default:
      return state;
  }
};

// define it as gloabl variable
let currentStore = null;
const middlewares = [];

/**
 * START
 * middlewares config
 */

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
 * config compose with middlewares
 */
let customCompose = compose(applyMiddleware(...middlewares));

// wrap customCompose by composeWithDevTools with configs to enable redux dev
// tools
if (process.env.NODE_ENV === 'development') {
  // this is for redux dev tools
  const composeEnhancers = composeWithDevTools({
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
export const configureStore = (initialState = {count:0}) => {
  currentStore = createStore(reducer, initialState, customCompose);
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
 * get current state
 */
export const getState = () => currentStore.getState();