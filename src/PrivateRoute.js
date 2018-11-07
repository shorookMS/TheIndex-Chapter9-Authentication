import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, user, redirectUrl, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user ? <Redirect to={redirectUrl || "/"} /> : <Component {...props} />
    }
  />
);

const mapStateToProps = state => ({ user: state.rootAuth.user });

export default connect(mapStateToProps)(PrivateRoute);
