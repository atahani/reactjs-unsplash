import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import ContainerDimensions from 'react-container-dimensions';
import Header from '../Header';
import Home from '../Home';
import {maxWidthContent} from '../../style/util';

const Wrapper = styled.div`
  height: 100%;
`;

const Main = styled.div`
  max-width: ${`${maxWidthContent}px`};
  margin: 0 auto;
  width: 100%;
  height: 100%;
  top: 0;
`;

const Content = styled.div`
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
        </Switch>
      </Content>
    </Main>
  </Wrapper>
);

export default App;