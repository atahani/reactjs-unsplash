import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div `
  padding: 10px;
  display: flex;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  justify-content: space-around;
`;

const AppTitle = styled.h1 `
  font-size: 36px;
  font-weight: bold;
  line-height: 1.2;
`;

const Login = ({}) => (
  <Wrapper>
    <Content>
      <AppTitle>Unsplash Clone App</AppTitle>
    </Content>
  </Wrapper>
);

Login.propTypes = {};

export default Login;