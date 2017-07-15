import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import _Link from '../Link';
import _ExtLink from '../ExtLink';
import {} from '../../style/colors';

const Wrapper = styled.div `
  width: 100%;
  padding: 8px 0px;
`;

const List = styled.ul `
  margin-bottom: 0;
`;

const Item = styled.li `
  box-sizing: border-box;
  width: 100%;
  white-space: nowrap;
  font-size: 15px;;
  font-weight: 300;
`;

const Link = styled(_Link)`
  padding: 7px 25px;
  display: block;
`;

const ExtLink = styled(_ExtLink)`
  padding: 7px 25px;
  display: block;
`;

const NavOnAvatar = ({profileLink}) => (
  <Wrapper>
    <List>
      <Item secondary>
        <ExtLink target="blank" href={profileLink}>Profile</ExtLink>
      </Item>
      <Item secondary>
        <ExtLink target="blank" href="https://unsplash.com/account">Account Settings</ExtLink>
      </Item>
      <Item secondary>
        <Link to="/logout">Logout</Link>
      </Item>
    </List>
  </Wrapper>
);

NavOnAvatar.propTypes = {
  profileLink: PropTypes.string
};

export default connect(state => ({profileLink: state.user.links.html}))(NavOnAvatar);