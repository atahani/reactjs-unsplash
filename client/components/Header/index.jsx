import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import EventListener from 'react-event-listener';
import styled from 'styled-components';
import _Logo from '../svg-images/camera';
import TextInput from '../TextInput';
import Popover from '../Popover';
import Avatar from '../Avatar';
import NavOnAvatar from '../NavOnAvatar';
import {maxWidthContent} from '../../style/util';
import {white, dividerColor} from '../../style/colors';

const Wrapper = styled.div `
  background-color: ${white};
`;

const Logo = styled(_Logo)`
  width: 28px;
  height: 28px;
`;

const TopBarWrapper = styled.div `
  background-color: ${white};
  height: 65px;
  width: 100%;
  ${props => props.fixed
  ? `
    position: fixed;
    z-index: 9999;
    border-bottom: solid 1px ${dividerColor};
  `
  : `
    position: relative;
  `}
`;

const TopBar = styled.div `
  max-width: ${`${maxWidthContent}px`};
  width: 100%;
  height: 100%;
  top: 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 8px;
`;

const SearchTx = styled(TextInput)`
  flex: 1;
  margin: 0px 16px;
`;

const Controller = styled.div `
  display: flex;
  align-items: center;
`;

const AButton = styled.button `
  cursor: pointer;
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      last_scroll_top: 0,
      top_bar_fixed: false
    };
    this.handleScroll = this
      .handleScroll
      .bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // prevent to re render view in update last_scroll_top state
    if (nextState.last_scroll_top !== this.state.last_scroll_top) {
      return false;
    }
    return true;
  }

  handleScroll(e) {
    const {last_scroll_top} = this.state;
    const scrollTop = e.target.body.scrollTop;
    if (scrollTop < last_scroll_top && scrollTop > 0) {
      this.setState({top_bar_fixed: true});
    } else {
      this.setState({top_bar_fixed: false});
    }
    // set this scrollTop as last
    this.setState({last_scroll_top: scrollTop});
  }

  render() {
    const {userImageProfile, width} = this.props;
    const {top_bar_fixed} = this.state;
    const avatar = () => {
      if (userImageProfile) {
        return (
          <Popover
            arrowSide={width > 1130
            ? 'center'
            : 'right'}
            autoCloseWhenOffScreen
            width={200}
            target={<AButton > <Avatar imagePath={userImageProfile} /> </AButton>}
          >
            <NavOnAvatar />
          </Popover>
        );
      }
      return null;
    };
    return (
      <Wrapper>
        <EventListener target="window" onScroll={this.handleScroll} />
        <TopBarWrapper fixed={top_bar_fixed}>
          <TopBar>
            <Logo />
            <Controller>
              <SearchTx hintText="Search photos" rounded /> {avatar()}
            </Controller>
          </TopBar>
        </TopBarWrapper>
      </Wrapper>
    );
  }
}

Header.propTypes = {
  userImageProfile: PropTypes.string,
  width: PropTypes.number,
};

/**
 * NOTE: since we use wrap component with connect the Route and also use NavLink inside 'Nav Component' the Route and NavLink dosn't connected
 * and when route changed the NavLink don't rerender
 * so we use Wrap component with withRouter
 * MORE_INFO: https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
 */
export default withRouter(connect(state => ({
  // the getProfile fire after getAccessToken so the profile_image maybe undefined
  // in load
  userImageProfile: state.user.user_profile.profile_image
    ? state.user.user_profile.profile_image.medium
    : void 0
}))(Header));