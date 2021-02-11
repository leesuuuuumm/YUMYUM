import React, {useState, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';

const LoginRoute = ( {component: Component, rest}) => {
  const [islogin, setIsLogin] = useState("")
  
  useEffect(() => {
    setIsLogin(localStorage.getItem("loggedInfo"))
  },[])

  return (
    <Route
      {...rest}
      render={props => {
        if(islogin) {
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
