/* eslint-disable default-case */
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user    : null,
  loading : false,
  error   : null,
  token   : null
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case actionTypes.SIGNUP_START:
      newState.loading = true;
      break;
    case actionTypes.SIGNUP_SUCCESS:
      newState.user = action.auth;
      newState.token = action.auth.idToken;
      newState.loading = false;
      newState.error = null;
      break;
    case actionTypes.SIGNUP_FAIL:
      newState.loading = false;
      newState.error = action.error.message;
      break;
    case actionTypes.SIGNIN_START:
      newState.loading = true;
      break;
    case actionTypes.SIGNIN_SUCCESS:
      newState.user = action.user;
      newState.token = action.user.idToken;
      newState.loading = false;
      newState.error = null;
      break;
    case actionTypes.SIGNIN_FAIL:
      newState.loading = false;
      newState.error = action.error.message;
      break;
    case actionTypes.LOGOUT_USER:
      newState.user = null;
      newState.token = null;
      break;
  }
  return newState;
};

export default reducer;
