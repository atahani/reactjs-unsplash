//@flow

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import styled from 'styled-components';
import {lighten} from 'polished';
import Avatar from '../Avatar';
import LikeIcon from '../svg-icons/like';
import DownloadIcon from '../svg-icons/download';
import AddIcon from '../svg-icons/add';
import Button from '../Button';
import {likePhoto, unLikePhoto} from '../../actions/photo';
import { screenLargerThan } from '../../style/util';
import {primaryColor1, white, likeColor, greenColor} from '../../style/colors';
import type { Photo } from '../../types/data';

const ImageView = styled.img `
  width: 100%;
  height: auto;
  position: relative;
`;

const UserInfo = styled.a `
  display: flex;
  align-items: center;
  width: 100%;
  height: 55px;
  color: ${primaryColor1};
  margin: 4px;
  ${screenLargerThan.tablet`
    align-items: center;
    position: absolute;
    z-index: 99;
    top: 15px;
    left: 15px;
    height: 40px;
    color: ${white};
    display: none;
  `};
`;

const Footer = styled.div `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  ${screenLargerThan.tablet`
    position: absolute;
    bottom: 0;
    z-index: 99;
    display: none;
    align-items: center;
    svg {
      width: 26px;
      height: 26px;
    }
    padding: 0px 8px;
  `};
`;

const Wrapper = styled.div`
  margin-bottom: 18px;
  ${screenLargerThan.tablet`
    margin-bottom: 12px;
    margin-left: 6px;
    margin-right: 6px;
    &:hover {
      background-color: ${lighten(0.25, primaryColor1)};
      ${ImageView} {
        opacity: 0.65;
      }
      ${UserInfo} {
        display: flex;
      }
      ${Footer} {
        display: flex;
      }
    }
  `};
`;

const Overlay = styled.div `
  position: relative;
  width: 100%;
`;

const DisplayName = styled.div `
  margin-left: 8px;
  font-weight: 600;
  font-size: 16px;
`;

const BtnDown = styled(Button)`
  svg {
    color: ${greenColor};
    fill: ${greenColor};
  }
  ${screenLargerThan.tablet`
    border: none;
    background-color: transparent !important;
    svg {
      color: ${white};
      fill: ${white};
    }
  `};
`;

const LikedBtn = styled(Button)`
  display: flex;
  align-items: center;
  margin: 0;
  ${props => props.likedByUser
  && `
    background-color: ${likeColor};
    color: ${white};
    &:hover {
      color: ${white};
      border-color: transparent !important;
    }
  `};
  ${screenLargerThan.tablet`
    flex-direction: column;
    height: auto;
    border: none;
    color: ${white} !important;
    background-color: transparent !important;
    svg {
      fill: ${white};
      color: ${white};
    }
    ${props => props.likedByUser
      && `
        svg {
          fill: ${likeColor};
          color: ${white};
        }
      `};
    &:hover {
      color: ${white};
    }
  `};
`;

const LikesCounter = styled.span `
  margin: 0px 6px;
`;

const CollectBtn = styled(Button)`
  display: flex;
  align-items: center;
  margin: 0;
  width: 95px;
  justify-content: space-between;
  ${screenLargerThan.tablet`
     background-color: transparent !important;
     border: none;
     span {
       display: none;
     }
     svg {
       fill: ${props => props.primaryColor === greenColor ? greenColor :  white};
       color: ${props => props.primaryColor === greenColor ? greenColor : white};
     }
  `};
`;

const LeftBtnsWrapper = styled.div`
  display: flex;
  ${screenLargerThan.tablet`
     height: 100%;
  `};
`;

type Props = {
  photo: Photo,
  handleLikePhoto: Function,
  handleUnLikePhoto: Function,
  onPush: Function
}

const userInfo = (userProfileLink, userName, userImage) => (
  <UserInfo target="_blank" href={userProfileLink}>
    <Avatar name={userName} imagePath={userImage} />
    <DisplayName>{userName}</DisplayName>
  </UserInfo>
);

const PhotoComponent = ({photo, handleLikePhoto, handleUnLikePhoto, onPush, ...others}: Props) => {
  // push to add_to_collection with photo id to catch it in dialog
  const clickOnCollect = () => onPush(`?add_to_collection&id=${photo.id}`);
  return (
    <Wrapper {...others}>
      <Overlay>
        {userInfo(photo.user.links.html, photo.user.name, photo.user.profileImage.medium)}
        <ImageView  src={photo.urls.small} />
        <Footer>
          <LeftBtnsWrapper>
            <BtnDown target="_blank" href={`${photo.links.download}?force=true`}>
              <DownloadIcon />
            </BtnDown>
            <CollectBtn
              primary
              primaryColor={photo.currentUserCollections && photo.currentUserCollections.length > 0
        ? greenColor
        : primaryColor1}
              onClick={() => clickOnCollect()}
            >
              <AddIcon size={18} color={white} />
              <span>Collect</span>
            </CollectBtn>
          </LeftBtnsWrapper>
          <LikedBtn
            likedByUser={photo.likedByUser}
            onClick={() => photo.likedByUser
          ? handleUnLikePhoto(photo.id)
          : handleLikePhoto(photo.id)}
          >
            <LikeIcon
              size={18}
              color={photo.likedByUser
            ? white
            : likeColor}
              hoverColor={photo.likedByUser
            ? white
            : likeColor}
            />
            <LikesCounter>{photo.likes}</LikesCounter>
          </LikedBtn>
        </Footer>
      </Overlay>
    </Wrapper>
  );
};

export default connect(() => ({}), dispatch => bindActionCreators({
  handleLikePhoto: likePhoto,
  handleUnLikePhoto: unLikePhoto,
  onPush: push
}, dispatch))(PhotoComponent);