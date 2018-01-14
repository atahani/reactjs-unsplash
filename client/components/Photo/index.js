//@flow

import React, {Component} from 'react';
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
import {primaryColor1, white, likeColor, greenColor} from '../../style/colors';
import type { Photo } from '../../types/data';

const Wrapper = styled.div `
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  float: left;
  margin-bottom: 10px;
  ${props => props.overlay
  ? `
    background-color: ${lighten(0.25, primaryColor1)}
  `
  : ``};
`;

const ImageView = styled.img `
  width: 100%;
  height: 100%;
  position: relative;
  ${props => props.overlay
  ? `opacity: 0.65`
  : ``}
`;

const Overlay = styled.div `
  position: relative;
  width: 100%;
  height: 100%:
`;

const UserInfo = styled.a `
  ${props => props.overlay
  ? `
    position: absolute;
    z-index: 99;
    top: 20px;
    left: 20px;
    height: 40px;
    color: ${white};
  `
  : `
    height: 55px;
    color: ${primaryColor1};
    margin: 4px;
  `}
  width: 100%;
  display: flex;
  align-items: center;
`;

const DisplayName = styled.div `
  margin-left: 8px;
  font-weight: 600;
  font-size: 16px;
`;

const ActionsBtns = styled.div `
  position: absolute;
  z-index: 99;
  bottom: 22px;
  left: 10px;
  display: flex;
  align-items: center;
`;

const Btn = styled.button `
  margin: 4px 8px;
  cursor: pointer;
`;

const BtnDown = styled.a `
  margin: 4px 8px;
  cursor: pointer;
`;

const BtnLiked = styled.button `
  cursor: pointer;
  margin: 4px;
  position: absolute;
  z-index: 99;
  color: ${white};
  font-size: 13px;
  font-weight: 600;
  padding: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
  bottom: 5px;
  right: 10px;
`;

const LikesText = styled.div `
  margin-top: 3px;
`;

const Row = styled.div `
  margin-bottom: 18px;
`;

const RowImgWrapper = styled.div `
  height: ${props => `${props.height}px`};
  width: 100%;
`;

const RowFooter = styled.div `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;

const BtnLikedR = styled(Button)`
  display: flex;
  align-items: center;
  ${props => props.likedByUser
  ? `
    background-color: ${likeColor};
    color: ${white};
    &:hover {
      color: ${white};
      border-color: transparent !important;
    }
  `
  : ``};
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
`;

type Props = {
  isRow: boolean,
  width: number,
  photo: Photo,
  handleLikePhoto: Function,
  handleUnLikePhoto: Function,
  onPush: Function
}

type State = {
  showOverlay: boolean,
}

class PhotoComponent extends Component<Props,State> {
  static defualtProps = {
    isRow: false,
  };
  state = {
    showOverlay: false
  };

  handleMouseLeave = () => {
    if (!this.props.isRow) {
      this.setState({showOverlay: false});
    }
  }

  handleMouseEnter = () => {
    if (!this.props.isRow) {
      this.setState({showOverlay: true});
    }
  }

  render() {
    const {
      isRow,
      width,
      photo,
      handleLikePhoto,
      handleUnLikePhoto,
      onPush,
      ...others,
    } = this.props;
    const height = (photo.height * width) / photo.width;
    const {showOverlay} = this.state;
    const clickOnCollect = () => {
      // push to add_to_collection with photo id to catch it in dialog
      onPush(`?add_to_collection&id=${photo.id}`);
    };
    const userInfo = () => (
      <UserInfo overlay={showOverlay} target="_blank" href={photo.user.links.html}>
        <Avatar name={photo.user.name} imagePath={photo.user.profileImage.medium} />
        <DisplayName>{photo.user.name}</DisplayName>
      </UserInfo>
    );
    const columnView = () => {
      if (showOverlay) {
        return (
          <Overlay>
            {userInfo()}
            <BtnLiked
              onClick={() => photo.likedByUser
              ? handleUnLikePhoto(photo.id)
              : handleLikePhoto(photo.id)}
            >
              <LikeIcon
                color={photo.likedByUser
                ? likeColor
                : white}
                hoverColor={likeColor} 
              />
              <LikesText>{photo.likes}</LikesText>
            </BtnLiked>
            <ActionsBtns>
              <BtnDown target="_blank" href={`${photo.links.download}?force=true`}>
                <DownloadIcon color={white} />
              </BtnDown>
              <Btn onClick={() => clickOnCollect()}>
                <AddIcon
                  color={photo.currentUserCollections && photo.currentUserCollections.length > 0
                  ? greenColor
                  : white} 
                />
              </Btn>
            </ActionsBtns>
            <ImageView overlay={showOverlay} src={photo.urls.small} />
          </Overlay>
        );
      }
      return (<ImageView overlay={showOverlay} src={photo.urls.small} />);
    };
    const main = () => {
      if (isRow) {
        return (
          <Row>
            {userInfo()}
            <RowImgWrapper height={height} {...others}>
              <ImageView overlay={showOverlay} src={photo.urls.small} />
            </RowImgWrapper>
            <RowFooter>
              <div style={{
                display: 'flex'
              }}
              >
                <BtnLikedR
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
                </BtnLikedR>
                <Button target="_blank" href={`${photo.links.download}?force=true`}>
                  <DownloadIcon color={greenColor} />
                </Button>
              </div>
              <CollectBtn
                primary
                primaryColor={photo.currentUserCollections && photo.currentUserCollections.length > 0
                ? greenColor
                : primaryColor1}
                onClick={() => clickOnCollect()}
              >
                <AddIcon size={18} color={white} />
                Collect
              </CollectBtn>
            </RowFooter>
          </Row>
        );
      }
      return (
        <Wrapper
          {...others}
          width={width}
          height={height}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          overlay={showOverlay}
        >
          {columnView()}
        </Wrapper>
      );
    };
    return main();
  }
}

export default connect(state => ({}), dispatch => bindActionCreators({
  handleLikePhoto: likePhoto,
  handleUnLikePhoto: unLikePhoto,
  onPush: push
}, dispatch))(PhotoComponent);