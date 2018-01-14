//@flow

import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Photos from '../../components/Photos';
import AddToCollectionDialog from '../AddToCollectionDialog';
import {getPhotos} from '../../actions/photo';
import {clearItems} from '../../actions/items';
import {API_ROOT} from '../../constants/service-info';

type Props = {
  photos: Object,
  nextPhotosLink: string,
  onGetPhotos: Function,
  onClearItems: Function,
  onClearItems: Function
}

class Home extends Component<Props> {

  componentDidMount() {
    const {onGetPhotos, onClearItems} = this.props;
    // get photos in load of component used from '/photos' as URL request
    onClearItems('photos');
    onGetPhotos(`${API_ROOT}/photos`);
  }

  render() {
    const {photos, nextPhotosLink, onGetPhotos} = this.props;
    const main = () => (photos
      ? <Photos items={photos} onScrollToLoad={() => onGetPhotos(nextPhotosLink)} />
      : null);
    return (
      <div>
        <Helmet>
          <title>Home - unsplash clone</title>
        </Helmet>
        {main()}
        <AddToCollectionDialog />
      </div>
    );
  }
}

export default connect(state => ({photos: state.items.photos, nextPhotosLink: state.items.photosAttr.next}), dispatch => bindActionCreators({
  onGetPhotos: getPhotos,
  onClearItems: clearItems
}, dispatch))(Home);