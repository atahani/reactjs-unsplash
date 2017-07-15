import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import App from '../App';
import Login from '../Login';
import Logout from '../Logout';
import NotFound from '../NotFound';
import Authorize from '../Authorize';

const Wrapper = styled.div `
  height: 100%;
`;

const MainApp = ({className}) => (
  <Wrapper className={className}>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Unsplash clone app</title>
    </Helmet>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/auth/callback" component={Authorize} />
      <Route path="/auth" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route component={NotFound} />
    </Switch>
  </Wrapper>
);

MainApp.propTypes = {
  className: PropTypes.string
};

export default MainApp;