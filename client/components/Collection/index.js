//@flow

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { lighten } from 'polished';
import Avatar from '../Avatar';
import LockIcon from '../svg-icons/lock';
import EditIcon from '../svg-icons/edit';
import { screenLargerThan } from '../../style/util';
import {
  secondaryColor1,
  dividerColor,
  primaryColor1,
  white,
} from '../../style/colors';

const Wrapper = styled.div`
  display: flex;
  max-width: 100%;
  flex-basis: 100%;
  ${screenLargerThan.tablet`
    flex-basis: 50%;
  `};
  ${screenLargerThan.desktop`
    flex-basis: 33.3333333333%;
  `};
`;

const Card = styled.div`
  width: 100%;
  margin: 5px;
  border: 1px solid ${dividerColor};
  border-radius: 10px;
`;

const CoverLink = styled(Link)``;

const Cover = styled.div`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  padding-bottom: 55%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: ${secondaryColor1};
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
  background-color: ${lighten(0.15, primaryColor1)};
  opacity: 0.4;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Title = styled.div`
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
  left: 10px;
  fill: ${white};
  opacity: 0.7;
`;

const Footer = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  justify-content: space-between;
`;

const UserLink = styled.a`
  display: flex;
  align-items: center;
  color: ${lighten(0.35, primaryColor1)};
`;

const DisplayName = styled.div`
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
  collection: Collection,
  editable: boolean,
};

const Collection = ({ editable, collection, ...others }: Props) => (
  <Wrapper {...others}>
    <Card>
      <CoverLink to={`/collections/${collection.id}`}>
        <Cover>
          <Overlay />
          <Title>{collection.title}</Title>
          <Counter>{`${collection.totalPhotos} Photos`}</Counter>
          <ImgCover
            src={
              collection.coverPhoto
                ? `${
                    collection.coverPhoto.urls.raw
                  }?dpr=1&auto=compress,format&fit=crop&w=400&q=80&cs=tinysrgb`
                : void 0
            }
            alt={collection.name}
          />
          {collection.is_private ? <PrivateIcon size={16} /> : null}
        </Cover>
      </CoverLink>
      <Footer>
        <UserLink target="_blank" href={collection.user.links.html}>
          <Avatar
            imagePath={collection.user.profileImage.medium}
            name={collection.user.name}
          />
          <DisplayName>{collection.user.name}</DisplayName>
        </UserLink>
        {editable ? (
          <EditBtn to={`/collections/edit/${collection.id}`}>
            <EditIcon />
          </EditBtn>
        ) : null}
      </Footer>
    </Card>
  </Wrapper>
);

export default Collection;
