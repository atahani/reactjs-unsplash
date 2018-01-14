//@flow

import React from 'react';
import styled from 'styled-components';
import {Route, Switch, Redirect} from 'react-router-dom';
import ContainerDimensions from 'react-container-dimensions';
import Header from '../Header';
import Home from '../Home';
import Search from '../Search';
import UserCollections from '../UserCollections';
import LikedPhotos from '../LikedPhotos';
import NotFound from '../NotFound';
import PhotosByCollection from '../PhotosByCollection';
import {maxWidthContent} from '../../style/util';

const Wrapper = styled.div `
  height: 100%;
`;

const Main = styled.div `
  max-width: ${`${maxWidthContent}px`};
  margin: 0 auto;
  width: 100%;
  height: 100%;
  top: 0;
`;

const Content = styled.div `
  margin-top: 15px;
  padding: 0px 16px;
`;

const App = () => (
  <Wrapper>
    <ContainerDimensions>
      {({width}) => <Header width={width} />}
    </ContainerDimensions>
    <Main>
      <Content>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search/:query" component={Search} />
          <Route exact path="/search/:type/:query" component={Search} />
          <Route exact path="/collections" component={UserCollections} />
          <Route exact path="/collections/new" component={UserCollections} />
          <Route exact path="/collections/:id" component={PhotosByCollection} />
          <Route path="/collections/edit/:id" component={PhotosByCollection} />
          <Route path="/liked-photos" component={LikedPhotos} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </Content>
    </Main>
  </Wrapper>
);

export default App;