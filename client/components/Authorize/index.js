import {Component} from 'react';
import PropTypes from 'prop-types';
import {getAccessToken} from '../../actions/user';
import {getStore, getHistory} from '../../store';

class Authorize extends Component {

  componentDidMount() {
    // handle get access token with authorization code
    // NOTE: more information at
    // https://stackoverflow.com/questions/43216569/how-to-get-query-parameters-in-r
    // e act-router-v4 should get query string from history
    const {dispatch} = getStore();
    const URLQStrings = new URLSearchParams(getHistory().location.search);
    const code = URLQStrings.has('code')
      ? URLQStrings.get('code')
      : void 0;
    // get access token
    dispatch(getAccessToken(code));
  }

  render() {
    return false;
  }
}

Authorize.propTypes = {
  match: PropTypes.object
};

export default Authorize;