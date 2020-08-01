import * as actionTypes from './actionTypes';
import axios from '../../axios';

const getIngredients = data => {
  return { type: actionTypes.GET_INGREDIENTS, data };
};

const getOrders = data => {
  return { type: actionTypes.GET_ORDERS, data };
};

export const ingredientsActions = {
  getIngredients   : () => dispatch => {
    axios.get('/ingredients.json').then(result => {
      dispatch(getIngredients(result.data));
    });
  },
  addIngredient    : type => {
    return { type: actionTypes.ADD_INGREDIENT, ingredientType: type };
  },
  subIngredient    : type => {
    return { type: actionTypes.REMOVE_INGREDIENT, ingredientType: type };
  },
  resetIngredients : () => {
    return { type: actionTypes.RESET_INGREDIENTS };
  },
  getOrders        : () => dispatch => {
    axios.get('/orders.json').then(result => {
      dispatch(getOrders(result.data));
    });
  }
};
