import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Photos from '../Photos';
import AddToCollectionDialog from '../AddToCollectionDialog';
import {getPhotos} from '../../actions/photo';
import {clearItems} from '../../actions/items';
import {API_ROOT} from '../../constants/service-info';

class Home extends Component {

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
        {main()}
        <AddToCollectionDialog />
      </div>
    );
  }
}

Home.propTypes = {
  photos: PropTypes.object,
  nextPhotosLink: PropTypes.string,
  onGetPhotos: PropTypes.func,
  onClearItems: PropTypes.func,
  onClearItems: PropTypes.func
};

export default connect(state => ({photos: state.items.photos, nextPhotosLink: state.items.photos_attr.next}), dispatch => bindActionCreators({
  onGetPhotos: getPhotos,
  onClearItems: clearItems
}, dispatch))(Home);