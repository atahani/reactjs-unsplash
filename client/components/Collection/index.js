//@flow

import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {lighten} from 'polished';
import Avatar from '../Avatar';
import LockIcon from '../svg-icons/lock';
import EditIcon from '../svg-icons/edit';
import {secondaryColor1, dividerColor, primaryColor1, white} from '../../style/colors';

const Wrapper = styled.div `
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height + 60}px`};
  float: left;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid  ${dividerColor};
  border-radius: 10px;
  margin-left: ${props => `${props.marginLeft}px`};
  margin-right: ${props => `${props.marginRight}px`};
`;

const CoverLink = styled(Link)``;

const Cover = styled.div `
  width: 100%;
  height: ${props => `${props.height}px`};
  position: relative;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  ${props => props.imgUrl
  ? `
    background-image: url(${props.imgUrl});
  `
  : `
    background: ${secondaryColor1};
  `};
`;

const Overlay = styled.div `
  width: 100%;
  height: 100%;
  background-color: ${lighten(0.15, primaryColor1)};
  opacity: 0.4;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Title = styled.div `
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
  left: 10px;
  fill: ${white};
  opacity: 0.7;
`;

const Footer = styled.div `
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  justify-content: space-between;
`;

const UserLink = styled.a `
  display: flex;
  align-items: center;
  color: ${lighten(0.35, primaryColor1)};
`;

const DisplayName = styled.div `
  margin-left: 8px;
  font-weight: 600;
  font-size: 16px;
`;

const EditBtn = styled(Link)`
  fill: ${secondaryColor1};
  padding: 4px;
  cursor: pointer;
`;

type Props = {
  width: number,
  height: number,
  marginLeft: number,
  marginRight: number,
  collection: Collection,
  editable: boolean,
};

const Collection = ({
  width,
  height,
  marginLeft,
  marginRight,
  editable,
  collection,
  ...others
}: Props) => (
  <Wrapper
    width={width}
    height={height}
    marginLeft={marginLeft}
    marginRight={marginRight}
    {...others}
  >
    <CoverLink to={`/collections/${collection.id}`}>
      <Cover
        height={height}
        imgUrl={collection.coverPhoto
        ? `${collection.coverPhoto.urls.raw}?dpr=1&auto=compress,format&fit=crop&
              w=${width}&h=${height}&q=80&cs=tinysrgb`
        : void 0}
      >
        <Overlay />
        <Title>{collection.title}</Title>
        <Counter>{`${collection.totalPhotos} Photos`}</Counter>
        {collection.is_private
          ? <PrivateIcon size={16} />
          : null}
      </Cover>
    </CoverLink>
    <Footer>
      <UserLink target="_blank" href={collection.user.links.html}>
        <Avatar imagePath={collection.user.profileImage.medium} name={collection.user.name} />
        <DisplayName>{collection.user.name}</DisplayName>
      </UserLink>
      {editable ? 
        <EditBtn to={`/collections/edit/${collection.id}`}>
          <EditIcon />
        </EditBtn>
        : null}
    </Footer>
  </Wrapper>
);

export default Collection;