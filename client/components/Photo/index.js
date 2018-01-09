import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
  ${props => props.likeByUser
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

class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_overlay: false
    };
    this.handleMouseEnter = this
      .handleMouseEnter
      .bind(this);
    this.handleMouseLeave = this
      .handleMouseLeave
      .bind(this);
  }

  handleMouseLeave() {
    if (!this.props.isRow) {
      this.setState({show_overlay: false});
    }
  }

  handleMouseEnter() {
    if (!this.props.isRow) {
      this.setState({show_overlay: true});
    }
  }

  render() {
    const {
      className,
      isRow,
      width,
      id,
      urls,
      links,
      likes,
      likeByUser,
      imgHeight,
      imgWidth,
      byUser,
      handleLikePhoto,
      handleUnLikePhoto,
      onPush,
      belongsToCollections
    } = this.props;
    const height = (imgHeight * width) / imgWidth;
    const {show_overlay} = this.state;
    const clickOnCollect = () => {
      // push to add_to_collection with photo id to catch it in dialog
      onPush(`?add_to_collection&id=${id}`);
    };
    const userInfo = () => (
      <UserInfo overlay={show_overlay} target="_blank" href={byUser.links.html}>
        <Avatar name={byUser.name} imagePath={byUser.profile_image.medium} />
        <DisplayName>{byUser.name}</DisplayName>
      </UserInfo>
    );
    const columnView = () => {
      if (show_overlay) {
        return (
          <Overlay>
            {userInfo()}
            <BtnLiked
              onClick={() => likeByUser
              ? handleUnLikePhoto(id)
              : handleLikePhoto(id)}
            >
              <LikeIcon
                color={likeByUser
                ? likeColor
                : white}
                hoverColor={likeColor} 
              />
              <LikesText>{likes}</LikesText>
            </BtnLiked>
            <ActionsBtns>
              <BtnDown target="_blank" href={`${links.download}?force=true`}>
                <DownloadIcon color={white} />
              </BtnDown>
              <Btn onClick={() => clickOnCollect()}>
                <AddIcon
                  color={belongsToCollections && belongsToCollections.length > 0
                  ? greenColor
                  : white} 
                />
              </Btn>
            </ActionsBtns>
            <ImageView overlay={show_overlay} src={urls.small} />
          </Overlay>
        );
      }
      return (<ImageView overlay={show_overlay} src={urls.small} />);
    };
    const main = () => {
      if (isRow) {
        return (
          <Row>
            {userInfo()}
            <RowImgWrapper height={height} className={className}>
              <ImageView overlay={show_overlay} src={urls.small} />
            </RowImgWrapper>
            <RowFooter>
              <div style={{
                display: 'flex'
              }}
              >
                <BtnLikedR
                  likeByUser={likeByUser}
                  onClick={() => likeByUser
                  ? handleUnLikePhoto(id)
                  : handleLikePhoto(id)}
                >
                  <LikeIcon
                    size={18}
                    color={likeByUser
                    ? white
                    : likeColor}
                    hoverColor={likeByUser
                    ? white
                    : likeColor} 
                  />
                  <LikesCounter>{likes}</LikesCounter>
                </BtnLikedR>
                <Button target="_blank" href={`${links.download}?force=true`}>
                  <DownloadIcon size={20} color={greenColor} />
                </Button>
              </div>
              <CollectBtn
                primary
                primaryColor={belongsToCollections && belongsToCollections.length > 0
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
          className={className}
          width={width}
          height={height}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          overlay={show_overlay}
        >
          {columnView()}
        </Wrapper>
      );
    };
    return main();
  }
}

Photo.propTypes = {
  className: PropTypes.string,
  isRow: PropTypes.bool,
  width: PropTypes.number,
  id: PropTypes.string,
  urls: PropTypes.object,
  links: PropTypes.object,
  likes: PropTypes.number,
  likeByUser: PropTypes.bool,
  color: PropTypes.string,
  imgHeight: PropTypes.number,
  imgWidth: PropTypes.number,
  byUser: PropTypes.object,
  belongsToCollections: PropTypes.arrayOf(PropTypes.object),
  handleLikePhoto: PropTypes.func,
  handleUnLikePhoto: PropTypes.func,
  onPush: PropTypes.func
};

Photo.defualtProps = {
  isRow: false,
  belongsToCollections:[],
};

export default connect(state => ({}), dispatch => bindActionCreators({
  handleLikePhoto: likePhoto,
  handleUnLikePhoto: unLikePhoto,
  onPush: push
}, dispatch))(Photo);