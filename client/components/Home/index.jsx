import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Photo from '../Photo';
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
    const {photos} = this.props;
    const photo = photos
      ? photos[Object.keys(photos)[0]]
      : void 0;
    const main = () => {
      if (photo) {
        return (<Photo
          id={photo.id}
          urls={photo.urls}
          links={photo.links}
          likes={photo.likes}
          likeByUser={photo.liked_by_user}
          color={photo.color}
          imgHeight={photo.height}
          imgWidth={photo.width}
          byUser={photo.user}
          width={500}
          isRow={false}
          belongsToCollections={photo.current_user_collections} 
        />);
      }
      return (
        <h2>don't have any photo</h2>
      );
    };
    return (
      <div>
        {main()}
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