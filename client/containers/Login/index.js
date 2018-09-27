//@flow

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Button from '../../components/Button';
import Camera from '../../components/svg-images/camera';
import ExtLink from '../../components/ExtLink';
import { OAUTH_PATH } from '../../constants/service-info';

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  justify-content: space-around;
`;

const AppTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  line-height: 1.2;
`;

const Note = styled.div`
  margin-top: 10px;
  text-align: center;
`;

export const Login = () => (
  <Wrapper>
    <Helmet>
      <title>Authorize by unsplash.com</title>
    </Helmet>
    <Content>
      <Camera size={110} />
      <AppTitle>Unsplash Clone App</AppTitle>
      <a href={OAUTH_PATH}>
        <Button primary label="Authorize by unsplash.com" />
      </a>
      <Note>
        This project was developed to demonstrate how you can develop a React.js
        web application like
        <ExtLink target="blank" href="https://unsplash.com">
          unsplash.com
        </ExtLink>
        from scratch.
        <br />
        For more information please check
        <ExtLink
          target="blank"
          href="https://github.com/atahani/reactjs-unsplash"
        >
          Github
        </ExtLink>
      </Note>
    </Content>
  </Wrapper>
);

export default Login;
