import * as actionTypes from './actionTypes';
import axios from '../../axios';

const getOrders = data => {
  return { type: actionTypes.GET_ORDERS, data };
};

const getOrdersStart = () => {
  return { type: actionTypes.GET_ORDERS_START };
};

const getOrdersFail = error => {
  return { type: actionTypes.GET_ORDERS_FAIL, error: error };
};

export const ordersAction = {
  getOrders : (token) => dispatch => {
    dispatch(getOrdersStart());
    axios
      .get('/orders.json?auth=' + token)
      .then(result => {
        dispatch(getOrders(result.data));
      })
      .catch(err => dispatch(getOrdersFail(err)));
  }
};
