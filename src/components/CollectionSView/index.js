//@flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { lighten } from 'polished';
import LockIcon from '../svg-icons/lock';
import DoneIcon from '../svg-icons/done';
import RemoveIcon from '../svg-icons/remove';
import AddIcon from '../svg-icons/add';
import { screenLargerThan } from '../../style/util';
import {
  dividerColor,
  secondaryColor1,
  primaryColor1,
  white,
  greenColor,
} from '../../style/colors';
import type { Collection } from '../../types/data';

const Wrapper = styled.div`
  flex-basis: 90px;
  display: flex;
  ${props =>
    props.inRowSelection
      ? `
    cursor: pointer;
  `
      : ``} ${screenLargerThan.tablet`
    flex-basis: 25%;
  `};
`;

const Content = styled.div`
  width: 100%;
  margin: 8px 0px;
  border: 1px solid ${dividerColor};
  border-radius: ${props => (props.inRowSelection ? '3px' : '10px')};
  ${props =>
    props.inRowSelection
      ? `
    height: 120px;
  `
      : `
    height: 74px;
  `};
  ${screenLargerThan.tablet`
     ${props =>
       props.inRowSelection
         ? `
        height: unset;
        margin: 0px;
     `
         : `
        height: 94px;
        margin: 0px 4px;
      `};
  `};
`;

const Cover = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: ${props => (props.inRowSelection ? '3px' : '10px')};
  background: ${lighten(0.1, secondaryColor1)};
`;

const ImgCover = styled.img`
  display: block;
  position: absolute;
  width: 100%;
  height: auto;
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props =>
    props.selected ? lighten(0.15, greenColor) : lighten(0.15, primaryColor1)};
  opacity: 0.4;
  border-radius: ${props => (props.inRowSelection ? '3px' : '10px')};
`;

const Title = styled.h4`
  font-size: 24px;
  font-weight: 400;
  position: absolute;
  z-index: 99;
  bottom: 24px;
  left: 35px;
  color: ${white};
`;

const Counter = styled.div`
  font-size: 13px;
  position: absolute;
  z-index: 99;
  bottom: 10px;
  left: 35px;
  color: ${white};
  opacity: 0.7;
`;

const PrivateIcon = styled(LockIcon)`
  position: absolute;
  bottom: 34px;
  left: 15px;
  fill: ${white};
  opacity: 0.7;
`;

const SelectedStatusIcon = styled.div`
  position: absolute;
  right: 24px;
  bottom: 24px;
  fill: ${white};
`;

type Props = {
  inRowSelection: boolean,
  selected: boolean,
  collection: Collection,
};

type State = {
  overlay: boolean,
};

class CollectionSView extends Component<Props, State> {
  static defaultProps = {
    inRowSelection: false,
    selected: false,
  };
  state = {
    overlay: false,
  };

  handleMouseLeave = () => {
    if (this.props.inRowSelection) {
      this.setState({ overlay: false });
    }
  };

  handleMouseEnter = () => {
    if (this.props.inRowSelection) {
      this.setState({ overlay: true });
    }
  };

  render() {
    const { inRowSelection, selected, collection, ...others } = this.props;
    const { overlay } = this.state;
    const selectionStatus = () => {
      if (selected && overlay) {
        return <RemoveIcon size={22} fillFromParent />;
      } else if (overlay) {
        return <AddIcon size={22} fillFromParent />;
      } else if (selected) {
        return <DoneIcon size={22} fillFromParent />;
      }
    };
    const cover = () => (
      <Cover inRowSelection={inRowSelection}>
        {collection.coverPhoto && (
          <ImgCover
            src={`${
              collection.coverPhoto.urls.raw
            }?dpr=1&auto=compress,format&fit=crop&w=230&q=80&cs=tinysrgb`}
          />
        )}
        <Overlay inRowSelection={inRowSelection} selected={selected} />
        <Counter>
          {`${collection.totalPhotos ? collection.totalPhotos : 0} Photos`}
        </Counter>
        <Title>{collection.title}</Title>
        {collection.isPrivate ? <PrivateIcon size={16} /> : null}
        {inRowSelection ? (
          <SelectedStatusIcon>{selectionStatus()}</SelectedStatusIcon>
        ) : null}
      </Cover>
    );
    const content = () => {
      if (!inRowSelection) {
        return (
          <Link to={`/collections/${collection.id ? collection.id : ''}`}>
            {cover()}
          </Link>
        );
      }
      return cover();
    };
    return (
      <Wrapper
        {...others}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        inRowSelection={inRowSelection}>
        <Content inRowSelection={inRowSelection}>{content()}</Content>
      </Wrapper>
    );
  }
}

export default CollectionSView;
