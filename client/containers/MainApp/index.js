//@flow

import React from 'react';
import {Helmet} from 'react-helmet';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import PrivateRoute from '../../components/PrivateRoute';
import App from '../App';
import LoginContainers from '../Login';
import LogoutContainer from '../Logout';
import AuthorizeContainers from '../Authorize';
import Progress from '../../components/Progress';

const Wrapper = styled.div `
  height: 100%;
`;

type Props = {}

const MainApp = ({...others}: Props) => (
  <Wrapper {...others}>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Unsplash clone app</title>
    </Helmet>
    <Switch>
      <Route exact path="/auth/callback" component={AuthorizeContainers} />
      <Route path="/auth" component={LoginContainers} />
      <Route path="/logout" component={LogoutContainer} />
      <PrivateRoute path="/" component={App} />
    </Switch>
    <Progress />
  </Wrapper>
);

export default MainApp;