import { Component } from 'react';
import PropTypes from 'prop-types';
import { getAccessToken, } from '../../actions/user';
import { getStore, } from '../../store';

class Authorize extends Component {

  componentDidMount() {
    // handle get access token with authorization code 
    const { dispatch } = getStore();
    dispatch(getAccessToken('123'));
  }

  render() {
    return false;
  }
}

Authorize.propTypes = {
  match: PropTypes.object,
};

export default Authorize;