//@flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import EventListener from 'react-event-listener';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import _Logo from '../../components/svg-images/camera';
import _Nav from '../../components/Navigation';
import TextInput from '../../components/TextInput';
import Popover from '../../components/Popover';
import Avatar from '../../components/Avatar';
import NavOnAvatar from '../../components/NavOnAvatar';
import {maxWidthContent} from '../../style/util';
import {white, dividerColor} from '../../style/colors';
import type { UserProfile as UserProfileType } from '../../types/data';


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

const Nav = styled(_Nav)`
  max-width: ${`${maxWidthContent}px`};
  width: 100%;
  margin: 0 auto;
`;

type Props = {
  queryValue: string,
  userProfile: UserProfileType,
  width: number,
  onPush: Function,
}

type State = {
  lastScrollTop: number,
  topBarFixed: boolean,
  searchTxVal: string,
}

class Header extends Component<Props,State> {
  static defaultProps = {
    delayedCallback: () => {}
  }
  state = {
    lastScrollTop: 0,
    topBarFixed: false,
    searchTxVal:'',
  };

  componentWillMount() {
    // $FlowFixMe
    this.delayedCallback = debounce(e => {
      // `event.target` is accessible now
      const val = e
        .target
        .value
        .replace(' ', '-');
      if (val.trim().length > 0) {
        // push it to search
        this
          .props
          .onPush(`/search/${val}`);
      } else {
        // return to home
        this
          .props
          .onPush('/');
      }
    }, 700);
    this.setState({searchTxVal: this.props.queryValue});
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.queryValue !== this.props.queryValue && nextProps.queryValue !== this.state.searchTxVal && nextProps.queryValue === ''){
      this.setState({searchTxVal: ''});
    }
  }
  

  shouldComponentUpdate(nextProps, nextState) {
    // prevent to re render view in update lastScrollTop state
    if (nextState.lastScrollTop !== this.state.lastScrollTop) {
      return false;
    }
    return true;
  }

  onSearchTxChange = e => {
    e.persist();
    this.setState({searchTxVal: e.target.value});
    // $FlowFixMe
    this.delayedCallback(e);
  }

  handleScroll = e => {
    const {lastScrollTop} = this.state;
    const scrollTop = e.target.body.scrollTop;
    if (scrollTop < lastScrollTop && scrollTop > 0) {
      this.setState({topBarFixed: true});
    } else {
      this.setState({topBarFixed: false});
    }
    // set this scrollTop as last
    this.setState({lastScrollTop: scrollTop});
  }

  render() {
    const {userProfile, width} = this.props;
    const {topBarFixed, searchTxVal} = this.state;
    const avatar = () => {
      if (userProfile.profileImage) {
        return (
          <Popover
            arrowSide={width > 1130
            ? 'center'
            : 'right'}
            autoCloseWhenOffScreen
            width={200}
            target={
              <AButton > 
                <Avatar imagePath={userProfile.profileImage.medium} name={userProfile.name} /> 
              </AButton>
            }
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
        <TopBarWrapper fixed={topBarFixed}>
          <TopBar>
            <Logo />
            <Controller>
              <SearchTx value={searchTxVal} onChange={this.onSearchTxChange} hintText="Search photos" rounded /> {avatar()}
            </Controller>
          </TopBar>
        </TopBarWrapper>
        <Nav />
      </Wrapper>
    );
  }
}

/**
 * NOTE: since we use wrap component with connect the Route and also use NavLink inside 'Nav Component' the Route and NavLink dosn't connected
 * and when route changed the NavLink don't rerender
 * so we use Wrap component with withRouter
 * MORE_INFO: https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
 */
export default withRouter(connect(state => ({
  // the getProfile fire after getAccessToken so the profileImage maybe undefined
  // in load
  queryValue: state.app.searchValues.value,
  userProfile: state.user.userProfile,
}), dispatch => bindActionCreators({
  onPush: push
}, dispatch))(Header));