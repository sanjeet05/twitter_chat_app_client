import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ls from 'local-storage';

const isLoggedIn = () => {
  const auth = ls.get('auth');  
  if (auth) {
    return true;
  } else {
    return false;
  }   
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isLoggedIn()
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

export default PrivateRoute;
