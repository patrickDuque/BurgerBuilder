import * as actionTypes from './actionTypes';
import axios from 'axios';

export const signUp = signUp => dispatch => {
  dispatch({ type: actionTypes.SIGNUP_START });
  const authData = {
    email             : signUp.email,
    password          : signUp.password,
    returnSecureToken : true
  };
  axios
    .post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEseIx_gjCne8IFGcjBuskUGmmd06cYOU',
      authData
    )
    .then(res => {
      console.log(res);
      dispatch({ type: actionTypes.SIGNUP_SUCCESS, auth: res.data });
      dispatch(checkTokenTimeout(res.data.expiresIn));
    })
    .catch(err => {
      console.log(err.response.data.error);
      dispatch({ type: actionTypes.SIGNUP_FAIL, error: err.response.data.error });
    });
};

export const signIn = login => dispatch => {
  dispatch({ type: actionTypes.SIGNIN_START });
  const authData = {
    email             : login.email,
    password          : login.password,
    returnSecureToken : true
  };
  axios
    .post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEseIx_gjCne8IFGcjBuskUGmmd06cYOU',
      authData
    )
    .then(res => {
      console.log(res);
      dispatch({ type: actionTypes.SIGNIN_SUCCESS, user: res.data });
      dispatch(checkTokenTimeout(res.data.expiresIn));
    })
    .catch(err => {
      dispatch({ type: actionTypes.SIGNIN_FAIL, error: err.response.data.error });
    });
};

export const checkTokenTimeout = expireToken => dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, +expireToken * 1000);
};

export const logout = () => {
  return {
    type : actionTypes.LOGOUT_USER
  };
};
