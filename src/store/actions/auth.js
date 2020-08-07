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
      localStorage.setItem('token', res.data.idToken);
      const expirationDate = new Date(new Date().getTime() + +res.data.expiresIn * 1000);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', res.data.localId);
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
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type : actionTypes.LOGOUT_USER
  };
};

export const authCheck = () => dispatch => {
  const token = localStorage.getItem('token');
  console.log(token);
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate < new Date()) {
      dispatch(logout());
    } else {
      axios
        .post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBEseIx_gjCne8IFGcjBuskUGmmd06cYOU', {
          idToken : localStorage.getItem('token')
        })
        .then(res => {
          dispatch({ type: actionTypes.SIGNIN_SUCCESS, user: res.data.users[0] });
          dispatch(checkTokenTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        })
        .catch(err => console.log(err));
    }
  }
};
