import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import pickBy from 'lodash/pickBy';
import Photos from '../../components/Photos';
import AddToCollectionDialog from '../AddToCollectionDialog';
import {clearItems} from '../../actions/items';
import {getPhotos} from '../../actions/photo';

class LikedPhotos extends Component {
  componentDidMount() {
    const {onClearItems, onGetPhotos, likesLink} = this.props;
    onClearItems('photos');
    onGetPhotos(likesLink);
  }

  render() {
    const {photos, nextLikesLink, onGetPhotos} = this.props;
    const main = () => (photos
      ? <Photos
        items={photos}
        onScrollToLoad={() => nextLikesLink
          ? onGetPhotos(nextLikesLink)
          : {}} 
      />
      : null);
    return (
      <div>
        <Helmet>
          <title>Liked Photos - unsplash clone</title>
        </Helmet>
        {main()}
        <AddToCollectionDialog />
      </div>
    );
  }
}

LikedPhotos.propTypes = {
  photos: PropTypes.object,
  likesLink: PropTypes.string,
  nextLikesLink: PropTypes.string,
  onGetPhotos: PropTypes.func,
  onClearItems: PropTypes.func
};

export default connect(state => ({
  photos: pickBy(state.items.photos, item => item.liked_by_user === true),
  likesLink: state.user.links.likes,
  nextLikesLink: state.items.photos_attr.next
}), dispatch => bindActionCreators({
  onGetPhotos: getPhotos,
  onClearItems: clearItems
}, dispatch))(LikedPhotos);