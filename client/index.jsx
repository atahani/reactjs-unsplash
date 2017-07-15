import 'babel-polyfill';
import 'whatwg-fetch';
import 'url-search-params-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {configureStore, getHistory, setAsCurrentStore, getStore} from './store';
import MainApp from './components/MainApp';
import rootSaga from './sagas';
import './style/global';

/**
 * main func to initial react
 * NOTE: we use await for configureStore so this is async function
 */
async function run() {
  // history
  const history = getHistory();
  // config windows variable
  window.Promise = window.Promise || Promise;
  window.self = window;
  // since we call run also in module.hot check if store already config leave it
  if (getStore() === null) {
    // config redux store get store in --app-initial (this is for server side
    // rendering)
    const store = await configureStore(window['--app-initial']);
    // set rootSaga in store to handle async flow
    store.runSaga(rootSaga);
    // set this store as current store to afterwards getting store
    setAsCurrentStore(store);
  }

  // check env
  if (process.env.NODE_ENV === 'development') {
    ReactDOM.render(
      <AppContainer>
        <Provider store={getStore()}>
          <ConnectedRouter history={history}>
            <MainApp />
          </ConnectedRouter>
        </Provider>
      </AppContainer>, document.getElementById('app'));
  } else {
    ReactDOM.render(
      <Provider store={getStore()}>
        <ConnectedRouter history={history}>
          <MainApp />
        </ConnectedRouter>
      </Provider>, document.getElementById('app'));
  }
}

run();

/**
 * hot module replacement in development
 */

if (process.env.NODE_ENV === 'development' && module.hot) {
  module
    .hot
    .accept('./components/App', () => {
      run();
    });
  // Enable Webpack hot module replacement for reducers
  module
    .hot
    .accept('./reducers', () => {
      const nextRootReducer = require('./reducers').defualt;
      getStore().replaceReducer(nextRootReducer);
    });
}