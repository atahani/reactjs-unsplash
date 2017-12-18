import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import PrivateRoute from '../PrivateRoute';
import App from '../App';
import Login from '../Login';
import Logout from '../Logout';
import Authorize from '../Authorize';
import Progress from '../Progress';

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
      <Route exact path="/auth/callback" component={Authorize} />
      <Route path="/auth" component={Login} />
      <Route path="/logout" component={Logout} />
      <PrivateRoute path="/" component={App} />
    </Switch>
    <Progress />
  </Wrapper>
);

MainApp.propTypes = {
  className: PropTypes.string
};

export default MainApp;