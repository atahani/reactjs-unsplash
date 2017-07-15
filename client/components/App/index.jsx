import React from 'react';
import styled from 'styled-components';
import Popover from '../Popover';
import Avatar from '../Avatar';
import NavOnAvatar from '../NavOnAvatar';
import {maxWidthContent} from '../../style/util';

const AButton = styled.button `
  cursor: pointer;
`;

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

const App = () => (
  <Wrapper>
    <Main>
      <Popover
        arrowSide="center"
        autoCloseWhenOffScreen
        width={200}
        target={<AButton > <Avatar
          imagePath="https://images.unsplash.com/profile-1498917968264-0e0fe010f2ba?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=7965a9591c873dd581e33bd94f59da24"
          name="Ahmad tahani" 
        /> </AButton>}
      >
        <NavOnAvatar />
      </Popover>
    </Main>
  </Wrapper>
);

export default App;