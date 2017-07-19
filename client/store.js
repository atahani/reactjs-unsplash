import {createStore} from 'redux';

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

/**
 * configure store with initial state
 * NOTE: since the persist store take for a while use from Promise to configureStore
 * @param {object} initialState initial state can set by windows --app-initial
 */
export const configureStore = () => {
  currentStore = createStore(reducer);
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