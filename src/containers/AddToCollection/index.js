//@flow

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styled, { keyframes } from 'styled-components';
import { lighten } from 'polished';
import CloseIcon from '../../components/svg-icons/close';
import _CollectionSView from '../../components/CollectionSView';
import _AddNewCollection from '../AddOrEditCollection';
import { getPhoto } from '../../actions/photo';
import {
  getUserCollections,
  addPhotoToCollection,
  removePhotoFromCollection,
} from '../../actions/collection';
import { API_ROOT } from '../../constants/service-info';
import { secondaryColor1, white } from '../../style/colors';
import { media } from '../../style/util';
import type { Photo } from '../../types/data';

const slideInRight = keyframes`
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  height: 560px;
  width: 900px;
  overflow: hidden;
  ${media.desktop`
    width: 740px; 
  `} ${media.tablet`
      width: 100%;
      height: 100%;
    `};
`;

const CloseBtn = styled.button`
  margin: 4px 8px;
  cursor: pointer;
  position: absolute;
  right: 12px;
  top: 16px;
  z-index: 9;
`;

const Image = styled.div`
  width: 333px;
  background-image: ${props => `url(${props.imgUrl})`};
  background-size: cover;
  background-position: 50%;
  ${media.tablet`
      display: none;
    `};
`;

const Content = styled.div`
  flex: 1 auto;
  padding: 30px 25px;
  overflow: scroll;
  position: relative;
`;

const Header = styled.h1`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 25px;
  padding: 0px 4px;
`;

const NewCollection = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 26px 19px;
  font-size: 21px;
  line-height: 22px;
  color: ${white};
  background-color: ${lighten(0.1, secondaryColor1)};
  height: 75px;
  margin-bottom: 12px;
  border-radius: 3px;
  cursor: pointer;
`;

const CollectionSView = styled(_CollectionSView)`
  width: 100%;
  height: 75px;
  margin-bottom: 12px;
`;

const AddNewCollection = styled(_AddNewCollection)`
  position: absolute;
  top: 0;
  left: 0;
  animation: ${slideInRight} 300ms ease-in-out 0s 1 normal both running;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: ${white};
`;

type Props = {
  idFromUrl: string,
  photo: Photo,
  userCollections: Object,
  userCollectionsLink: string,
  showCreateNewCollection: boolean,
  onRequestClose: Function,
  onGetPhoto: Function,
  onGetUserCollections: Function,
  onAddPhotoToCollection: Function,
  onRemovePhotoFromCollection: Function,
  onPush: Function,
};

class AddToCollection extends Component<Props> {
  static defaultProps = {
    showCreateNewCollection: false,
  };

  componentDidMount() {
    // check if don't have this photo in state get this photo
    const {
      onGetPhoto,
      onGetUserCollections,
      idFromUrl,
      photo,
      userCollectionsLink,
    } = this.props;
    if (!photo) {
      // get photo
      onGetPhoto(idFromUrl);
    }
    // always get user collections in load
    onGetUserCollections(userCollectionsLink);
  }

  handleSelectCollection = (photoId, collectionId, selected) => {
    if (selected) {
      this.props.onRemovePhotoFromCollection(collectionId, photoId);
    } else {
      this.props.onAddPhotoToCollection(collectionId, photoId);
    }
  };

  render() {
    const {
      userCollections,
      photo,
      showCreateNewCollection,
      onRequestClose,
      onPush,
    } = this.props;
    const item = col => {
      const selectedItem = photo.currentUserCollections.find(
        item => item.id === col.id
      );
      return (
        <CollectionSView
          key={col.id ? col.id : ''}
          collection={col}
          inRowSelection
          selected={selectedItem !== void 0}
          onClick={() =>
            this.handleSelectCollection(
              photo.id,
              col.id,
              selectedItem !== void 0
            )
          }
        />
      );
    };
    const items = () =>
      Object.keys(userCollections).map(id => item(userCollections[id]));
    const main = () => {
      if (photo) {
        return (
          <Wrapper>
            <Helmet>
              <title>Add To Collection - unsplash clone</title>
            </Helmet>
            <CloseBtn onClick={e => onRequestClose(e)}>
              <CloseIcon />
            </CloseBtn>
            <Image
              imgUrl={`${
                photo.urls.raw
              }?dpr=1&auto=compress,format&fit=max&w=720&q=80&cs=tinysrgb&crop=entropy`}
            />
            <Content>
              <Header>Add To Collection</Header>
              <NewCollection
                onClick={() =>
                  onPush(
                    `?add_to_collection&id=${photo.id}&step=new_collection`
                  )
                }>
                Create a new collection
              </NewCollection>
              {items()}
              {showCreateNewCollection ? (
                <AddNewCollection
                  onRequestClose={() =>
                    onPush(`?add_to_collection&id=${photo.id}`)
                  }
                />
              ) : null}
            </Content>
          </Wrapper>
        );
      }
      return null;
    };
    return main();
  }
}

const mapStateToProps = state => {
  const searchParams = new URLSearchParams(state.router.location.search);
  const photoId = searchParams.get('id');
  const showCreateNewCollection = searchParams.has('step');
  const photo = state.items.photos[photoId];
  return {
    idFromUrl: photoId,
    photo,
    userCollections: state.items.userCollections,
    userCollectionsLink: `${API_ROOT}/users/${
      state.user.userProfile.username
    }/collections`,
    showCreateNewCollection,
  };
};

export default connect(
  mapStateToProps,
  {
    onGetPhoto: getPhoto,
    onGetUserCollections: getUserCollections,
    onAddPhotoToCollection: addPhotoToCollection,
    onRemovePhotoFromCollection: removePhotoFromCollection,
    onPush: push,
  }
)(AddToCollection);
