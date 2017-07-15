import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {Route, Switch} from 'react-router-dom';
import App from '../App';
import Login from '../Login';
import Logout from '../Logout';
import NotFound from '../NotFound';

const MainApp = ({}) => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Unsplash clone app</title>
    </Helmet>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/auth" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

MainApp.propTypes = {};

export default MainApp;