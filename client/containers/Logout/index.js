//@flow

import {Component} from 'react';
import {getStore} from '../../store';
import {logout} from '../../actions/user';

type Props = {}

class Logout extends Component<Props> {
  componentDidMount() {
    // dispatch logout action
    getStore().dispatch(logout());
  }
  render() {
    return null;
  }
}

export default Logout;