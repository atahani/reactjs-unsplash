import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';
import Button from '../Button';
import Camera from '../svg-images/camera';
import ExtLink from '../ExtLink';
import {OAUTH_PATH} from '../../constants/service-info';

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

const Note = styled.div `
  text-align: center;
`;

export const Login = ({}) => (
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
      <Note>this project made by
        <ExtLink target="blank" href="https://twitter.com/atahani">@atahani</ExtLink>
        for Reactjs + Redux tutorial that recorded for
        <ExtLink target="blank" href="https://faranesh.com">Faraneshcom</ExtLink>
        <br />
        source on
        <ExtLink target="blank" href="https://github.com/atahani">github</ExtLink>
      </Note>
    </Content>
  </Wrapper>
);

Login.propTypes = {};

export default Login;