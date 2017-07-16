import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getPhotos} from '../../actions/photo';
import {API_ROOT} from '../../constants/service-info';

class Home extends Component {

  componentDidMount() {
    const {onGetPhotos} = this.props;
    // get photos in load of component
    // used from '/photos' as URL request
    onGetPhotos(`${API_ROOT}/photos`);
  }

  render() {
    return (
      <div>
        Home
      </div>
    );
  }
}

Home.propTypes = {
  onGetPhotos: PropTypes.func
};

export default connect(null, dispatch => bindActionCreators({
  onGetPhotos: getPhotos
}, dispatch))(Home);