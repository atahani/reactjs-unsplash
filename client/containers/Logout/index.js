import {Component} from 'react';
import {getStore} from '../../store';
import {logout} from '../../actions/user';

class Logout extends Component {
  componentDidMount() {
    // dispatch logout action
    getStore().dispatch(logout());
  }
  render() {
    return null;
  }
}

Logout.propTypes = {};

export default Logout;