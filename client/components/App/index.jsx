import React from 'react';
import Button from '../Button';
import {getStore} from '../../store';
import {getProfile} from '../../actions/user';

const App = () => (
  <div>
    webpack and hot module replacement
    <br />
    <Button
      label="get user profile"
      onClick={() => getStore().dispatch(getProfile())} 
    />
  </div>
);

export default App;