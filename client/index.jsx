import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {BrowserRouter} from 'react-router-dom';
import MainApp from './components/MainApp';

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