/* eslint-disable default-case */
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders  : null,
  loading : false,
  error   : null
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case actionTypes.GET_INGREDIENTS_START:
      newState.loading = true;
      break;
    case actionTypes.GET_ORDERS:
      const ord = [];
      for (let order in action.data) {
        ord.push({ ...action.data[order], id: order });
      }
      newState.orders = ord;
      newState.loading = false;
      break;
    case actionTypes.GET_INGREDIENTS_FAIL:
      newState.error = action.error.message;
      newState.loading = false;
      break;
  }
  return newState;
};

export default reducer;
