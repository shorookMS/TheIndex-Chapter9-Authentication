import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionType from "./actionTypes";

const setAuthToken = token => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem("token");
  }
};

export const checkForExpiredToken = () => {
  return dispatch => {
    const token = localStorage.token;
    if (token) {
      const currentTime = Date.now() / 1000;
      const user = jwt_decode(token);
      if (user.exp >= currentTime) {
        setAuthToken(token);
        dispatch(setCurrentUser(user));
      } else {
        dispatch(logout());
      }
    }
  };
};

export const login = (userData, history) => {
  return dispatch => {
    axios
      .post("https://the-index-api.herokuapp.com/login/", userData)
      .then(res => res.data)
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token);
        dispatch(setCurrentUser(decodedUser));
        history.push("/");
      })
      .catch(err => console.error(err.response));
  };
};

export const signup = (userData, history) => {
  return dispatch => {
    axios
      .post("https://the-index-api.herokuapp.com/signup/", userData)
      .then(res => res.data)
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token);
        dispatch(setCurrentUser(decodedUser));
        history.push("/");
      })
      .catch(err => console.error(err.response));
  };
};

export const logout = () => {
  setAuthToken();
  return setCurrentUser();
};

const setCurrentUser = user => ({
  type: actionType.SET_CURRENT_USER,
  payload: user
});
