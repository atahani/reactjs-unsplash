import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {lighten} from 'polished';
import LockIcon from '../svg-icons/lock';
import DoneIcon from '../svg-icons/done';
import RemoveIcon from '../svg-icons/remove';
import AddIcon from '../svg-icons/add';
import {dividerColor, secondaryColor1, primaryColor1, white, greenColor} from '../../style/colors';

const Wrapper = styled.div `
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  float: left;
  border: 1px solid ${dividerColor};
  border-radius: ${props => props.inRowSelection
  ? '3px'
  : '10px'};
  ${props => props.inRowSelection
    ? `
    cursor: pointer;
  `
    : ``}
`;

const Cover = styled.div `
  width: 100%;
  height: ${props => `${props.height}px`};
  position: relative;
  border-radius: ${props => props.inRowSelection
  ? '3px'
  : '10px'};
  ${props => props.imgUrl
    ? `
    background-image: url(${props.imgUrl});
  `
    : `
    background: ${lighten(0.1, secondaryColor1)};
  `};
  background-size: cover;
  background-position: 50%;
`;

const Overlay = styled.div `
  width: 100%;
  height: 100%;
  background-color: ${props => props.selected
  ? lighten(0.15, greenColor)
  : lighten(0.15, primaryColor1)};
  opacity: 0.4;
  border-radius: ${props => props.inRowSelection
    ? '3px'
    : '10px'};
`;

const Title = styled.h4 `
  font-size: 24px;
  font-weight: 400;
  position: absolute;
  z-index: 99;
  bottom: 24px;
  left: 35px;
  color: ${white};
`;

const Counter = styled.div `
  font-size: 13px;
  position: absolute;
  z-index: 99;
  bottom: 10px;
  left: 35px;
  color: ${white};
  opacity: 0.7;
`;

const PrivateIcon = styled(LockIcon)
`
  position: absolute;
  bottom: 34px;
  left: 15px;
  fill: ${white};
  opacity: 0.7;
`;

const SelectedStatusIcon = styled.div `
  position: absolute;
  right: 24px;
  bottom: 24px;
  fill: ${white};
`;

class CollectionSView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: false
    };
    this.handleMouseEnter = this
      .handleMouseEnter
      .bind(this);
    this.handleMouseLeave = this
      .handleMouseLeave
      .bind(this);
  }

  handleMouseLeave() {
    if (this.props.inRowSelection) {
      this.setState({overlay: false});
    }
  }

  handleMouseEnter() {
    if (this.props.inRowSelection) {
      this.setState({overlay: true});
    }
  }

  render() {
    const {
      className,
      id,
      width,
      height,
      coverPhoto,
      title,
      totalPhotos,
      isPrivate,
      inRowSelection,
      selected,
      ...others
    } = this.props;
    const {overlay} = this.state;
    const selectionStatus = () => {
      if (selected && overlay) {
        return (<RemoveIcon size={22} fillFromParent />);
      } else if (overlay) {
        return (<AddIcon size={22} fillFromParent />);
      } else if (selected) {
        return (<DoneIcon size={22} fillFromParent />);
      }
    };
    const cover = () => (
      <Cover
        inRowSelection={inRowSelection}
        height={height}
        imgUrl={coverPhoto
        ? `${coverPhoto.urls.raw}?dpr=1&auto=compress,format&fit=crop&w=${width
          ? width
          : ''}&h=${height
            ? height
            : 240}&q=80&cs=tinysrgb`
        : void 0}
      >
        <Overlay inRowSelection={inRowSelection} selected={selected} />
        <Counter >
          {`${totalPhotos} Photos`
}
        </Counter>
        <Title >
          {title
}
        </Title>
        {isPrivate
          ? <PrivateIcon size={16} />
          : null}
        {inRowSelection
          ? <SelectedStatusIcon >
            {selectionStatus()
}
          </SelectedStatusIcon>
          : null}
      </Cover>
    );
    const content = () => {
      if (!inRowSelection) {
        return (
          <Link to={`/collections/${id}`}>
            {cover()
}
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
        className={className}
        width={width}
        height={height}
        inRowSelection={inRowSelection}
      >
        {content()
}
      </Wrapper>
    );
  }
}

CollectionSView.propTypes = {
  className: PropTypes.string,
  id: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  coverPhoto: PropTypes.object,
  title: PropTypes.string,
  totalPhotos: PropTypes.number,
  inRowSelection: PropTypes.bool,
  isPrivate: PropTypes.bool,
  selected: PropTypes.bool
};

CollectionSView.defaultProps = {
  inRowSelection: false,
  selected: false
};

export default CollectionSView;