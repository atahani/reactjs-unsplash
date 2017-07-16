import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {lighten} from 'polished';
import {Link} from 'react-router-dom';
import LockIcon from '../svg-icons/lock';
import {dividerColor, secondaryColor1, primaryColor1, white, greenColor} from '../../style/colors';

const Wrapper = styled.div `
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  float: left;
  border: 1px solid ${dividerColor};
  border-radius: 10px;
`;

const Cover = styled.div `
  width: 100%;
  height: ${props => `${props.height}px`};
  position: relative;
  border-radius: 10px;
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
  border-radius: 10px;
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

const PrivateIcon = styled(LockIcon)`
  position: absolute;
  bottom: 34px;
  left: 15px;
  fill: ${white};
  opacity: 0.7;
`;

class CollectionSView extends Component {

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
      ...others
    } = this.props;
    const cover = () => (
      <Cover
        height={height}
        imgUrl={coverPhoto
        ? `${coverPhoto.urls.raw}?dpr=1&auto=compress,format&fit=crop&w=${width
          ? width
          : ''}&h=${height
            ? height
            : 240}&q=80&cs=tinysrgb`
        : void 0}
      >
        <Overlay />
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
      </Cover>
    );
    return (
      <Wrapper
        {...others}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={className}
        width={width}
        height={height}
      >
        <Link to={`/collections/${id}`}>
          {cover()}
        </Link>
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
  isPrivate: PropTypes.bool
};

export default CollectionSView;