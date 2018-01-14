//@flow

//$FlowFixMe we should import Node as type but the eslint doesn't happy
import React,{ReactPropTypes} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {getState} from '../../store';

/**
 * NOTE: you can't wrap component with connect from react-redux, since the Route functionality doesn't work
 */
type Props = {
  component: ReactPropTypes,
}

const PrivateRoute = ({
  component: Component,
  ...rest
}: Props) => (
  <Route
    {...rest}
    render={props => (getState().user.isAuthorized
    ? (<Component {...props} />)
    : (<Redirect to={{
      pathname: '/auth'
    }} 
    />))} 
  />
);

export default PrivateRoute;