import React, {useState, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';

const LoginRoute = ( {component: Component, rest}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if(localStorage.getItem("loggedInfo")) {
          return <Redirect to='/feed/flippages' />
        }

        if (Component) {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default LoginRoute;
