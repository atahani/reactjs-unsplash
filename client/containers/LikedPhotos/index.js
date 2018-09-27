//@flow

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import pickBy from 'lodash/pickBy';
import Photos from '../../components/Photos';
import AddToCollectionDialog from '../AddToCollectionDialog';
import { clearItems } from '../../actions/items';
import { getPhotos } from '../../actions/photo';

type Props = {
  photos: Object,
  likesLink: string,
  nextLikesLink: string,
  onGetPhotos: Function,
  onClearItems: Function,
};

class LikedPhotos extends Component<Props> {
  componentDidMount() {
    const { onClearItems, onGetPhotos, likesLink } = this.props;
    onClearItems('photos');
    onGetPhotos(likesLink);
  }

  render() {
    const { photos, nextLikesLink, onGetPhotos } = this.props;
    const main = () =>
      photos ? (
        <Photos
          items={photos}
          onScrollToLoad={() =>
            nextLikesLink ? onGetPhotos(nextLikesLink) : {}
          }
        />
      ) : null;
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

export default connect(
  state => ({
    photos: pickBy(state.items.photos, item => item.likedByUser === true),
    likesLink: state.user.links.likes,
    nextLikesLink: state.items.photosAttr.next,
  }),
  dispatch =>
    bindActionCreators(
      {
        onGetPhotos: getPhotos,
        onClearItems: clearItems,
      },
      dispatch
    )
)(LikedPhotos);
