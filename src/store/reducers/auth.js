/* eslint-disable default-case */
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user    : null,
  loading : false,
  error   : null
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case actionTypes.AUTH_START:
      newState.loading = true;
      break;
    case actionTypes.AUTH_SUCCESS:
      newState.user = action.auth.data;
      newState.loading = false;
      newState.error = null;
      break;
    case actionTypes.AUTH_FAIL:
      newState.loading = false;
      newState.error = action.error;
      break;
  }
  return newState;
};

export default reducer;
