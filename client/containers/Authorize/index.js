//@flow

import {Component} from 'react';
import {getAccessToken} from '../../actions/user';
import {getStore, getHistory} from '../../store';

type Props = {}

class Authorize extends Component<Props> {

  componentDidMount() {
    // handle get access token with authorization code
    // NOTE: more information at
    // https://stackoverflow.com/questions/43216569/how-to-get-query-parameters-in-r
    // e act-router-v4 should get query string from history
    const {dispatch} = getStore();
    const URLQStrings = new URLSearchParams(getHistory().location.search);
    const code: string = URLQStrings.has('code')
      ? URLQStrings.get('code')
      : '';
    // get access token
    dispatch(getAccessToken(code));
  }

  render() {
    return false;
  }
}

export default Authorize;