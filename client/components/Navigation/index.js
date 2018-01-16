//@flow

import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import {lighten} from 'polished';
import {dividerColor, linkColor, activeLinkColor, primaryColor1} from '../../style/colors';

const Wrapper = styled.div `
  border-top: solid 1px ${dividerColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
`;

const List = styled.ul `
  display: inline-block;
  height: 100%;
`;

const Item = styled.li `
  display: inline-block;
  box-sizing: border-box;
  height: 100%;
`;

const Link = styled(NavLink)`
  padding: 4px 16px;
  display: inline-flex;
  align-items: center;
  height: 100%;
  color: ${lighten(0.1, linkColor)};
  &:hover {
    color: ${activeLinkColor};
  }
`;

type Props = {}

const Navigation = ({...others}: Props) => (
  <Wrapper {...others}>
    <List>
      <Item>
        <Link
          exact
          activeStyle={{
          color: primaryColor1
        }}
          to="/"
        >Home
        </Link>
        <Link
          exact
          activeStyle={{
          color: primaryColor1
        }}
          to="/collections"
        >Your Collection
        </Link>
        <Link
          exact
          activeStyle={{
          color: primaryColor1
        }}
          to="/liked-photos"
        >Liked photos
        </Link>
      </Item>
    </List>
  </Wrapper>
);

export default Navigation;