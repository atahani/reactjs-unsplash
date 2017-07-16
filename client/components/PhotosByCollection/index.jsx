import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'styled-components';
import {lighten} from 'polished';
import Photos from '../Photos';
import Avatar from '../Avatar';
import Button from '../Button';
import AddOrEditCollectionDialog from '../AddOrEditCollectionDialog';
import AddToCollectionDialog from '../AddToCollectionDialog';
import {getCollection, getCollectionPhotos} from '../../actions/collection';
import {clearItems} from '../../actions/items';
import {API_ROOT} from '../../constants/service-info';
import {primaryColor1} from '../../style/colors';

const Header = styled.div `
  margin-top: 15px;
`;

const Title = styled.h1 `
  font-size: 40px;
  font-weight: bold;
  padding: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Description = styled.p `
  font-size: 17px;
`;

const UserLink = styled.a `
  display: inline-flex;
  align-items: center;
  padding: 18px 4px;
  margin-bottom: 10px;
  color: ${lighten(0.35, primaryColor1)};
`;

const DisplayName = styled.div `
  margin-left: 8px;
  font-weight: 600;
  font-size: 16px;
`;

const EditBtn = styled(Button)`

`;

class PhotosByCollection extends Component {

  componentWillMount() {
    const {id} = this.props.match.params;
    const {onGetCollection, onClearItems} = this.props;
    onClearItems('photos');
    onGetCollection(`${API_ROOT}/collections/${id}`, true);
  }

  render() {
    const {loggedInUserId, collection, photos, nextPhotosLink, onGetCollectionPhotos} = this.props;
    const collectionInfo = () => {
      if (collection) {
        return (
          <Header>
            <Title>
              {collection.title}
              {loggedInUserId === collection.user.username
                ? <EditBtn label="Edit" primary href={`/collections/edit/${collection.id}`} />
                : null}
            </Title>
            {collection.description
              ? <Description>{collection.description}</Description>
              : null}
            <UserLink target="_blank" href={collection.user.links.html}>
              <Avatar imagePath={collection.user.profile_image.medium} />
              <DisplayName>{collection.user.name}</DisplayName>
            </UserLink>
          </Header>
        );
      }
    };
    return (
      <div>
        {collectionInfo()}
        <Photos
          items={photos}
          onScrollToLoad={() => nextPhotosLink
          ? onGetCollectionPhotos(nextPhotosLink)
          : {}} 
        />
        <AddOrEditCollectionDialog />
        <AddToCollectionDialog />
      </div>
    );
  }
}

PhotosByCollection.propTypes = {
  loggedInUserId: PropTypes.string,
  collection: PropTypes.object,
  photos: PropTypes.object,
  nextPhotosLink: PropTypes.string,
  match: PropTypes.object,
  onGetCollection: PropTypes.func,
  onGetCollectionPhotos: PropTypes.func,
  onClearItems: PropTypes.func
};

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  const collection = state.items.collections[id] || state.items.user_collections[id];
  return {collection, loggedInUserId: state.user.user_profile.username, photos: state.items.photos, nextPhotosLink: state.items.photos_attr.next};
};
export default connect(mapStateToProps, dispatch => bindActionCreators({
  onGetCollection: getCollection,
  onGetCollectionPhotos: getCollectionPhotos,
  onClearItems: clearItems
}, dispatch))(PhotosByCollection);