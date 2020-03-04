import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedComponent = ({ component: Component, active, ...rest }) => {
  let getUserToken = localStorage.getItem('userToken');
  return active ? (
    <Route
      {...rest}
      render={props => (!!getUserToken ? <Component {...props} token={getUserToken} /> : <Redirect to="/" />)}
    />
  ) : (
    <Route {...rest} render={props => (!!getUserToken ? <Redirect to="/dashboard" /> : <Component {...props} />)} />
  );
};

export default ProtectedComponent;
