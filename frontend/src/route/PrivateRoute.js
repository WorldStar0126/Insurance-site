import React from "react";
import { Route, Redirect } from "react-router-dom";

const token = sessionStorage.getItem('token');
const loggedAt = sessionStorage.getItem('loggedAt');
const currentTime = new Date().getTime();

let isAuth = true;
const diffTime = Math.round((currentTime - loggedAt) / 1000 / 60);
if (token == undefined || token == '' || diffTime > 24) {
    isAuth = false;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('loggedAt');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('avatar');
}

const path = window.location.pathname;

const PrivateRoute = ({ exact, component: Component, ...rest }) => (
  <Route
    exact={exact ? true : false}
    rest
    render={(props) =>
      isAuth ? (
        <Component {...props} {...rest}></Component>
      ) : (
        <Redirect to={`${process.env.PUBLIC_URL}/auth-login`}></Redirect>
      )
    }
  ></Route>
);

export default PrivateRoute;
