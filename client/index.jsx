import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {BrowserRouter} from 'react-router-dom';
import MainApp from './components/MainApp';
import {configureStore, getState,INCREMENT} from './store';
import './style/global';

const store = configureStore();
store.subscribe(() => {
  console.warn('state changed',getState());
});

store.dispatch({type:INCREMENT});
store.dispatch({type:INCREMENT});

const run = Component => {
  // check env
  if (process.env.NODE_ENV === 'development') {
    ReactDOM.render(
      <AppContainer>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </AppContainer>, document.getElementById('app'));
  } else {
    ReactDOM.render(
      <BrowserRouter>
        <Component />
      </BrowserRouter>, document.getElementById('app'));
  }
};

run(MainApp);

/**
 * hot module replacement in development
 */

if (process.env.NODE_ENV === 'development' && module.hot) {
  module
    .hot
    .accept('./components/App', () => {
      run(MainApp);
    });
}