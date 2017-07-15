import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './components/App';

const run = Component => {
  // check env
  if (process.env.NODE_ENV === 'development') {
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>, document.getElementById('app'));
  } else {
    ReactDOM.render(
      <Component />, document.getElementById('app'));
  }
};

run(App);

/**
 * hot module replacement in development
 */

if (process.env.NODE_ENV === 'development' && module.hot) {
  module
    .hot
    .accept('./components/App', () => {
      run(App);
    });
}