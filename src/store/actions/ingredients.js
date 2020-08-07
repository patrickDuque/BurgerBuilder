import * as actionTypes from './actionTypes';
import axios from '../../axios';
import UIkit from 'uikit';

const getIngredients = data => {
  return { type: actionTypes.GET_INGREDIENTS, data };
};

const getIngredientsStart = () => {
  return { type: actionTypes.GET_INGREDIENTS_START };
};

const getIngredientsFail = error => {
  return { type: actionTypes.GET_INGREDIENTS_FAIL, error: error };
};

const postOrder = () => {
  return { type: actionTypes.POST_ORDER };
};

const postOrderStart = () => {
  return { type: actionTypes.POST_ORDER_START };
};

const postOrderFail = error => {
  return { type: actionTypes.POST_ORDER_FAIL, error: error };
};

export const ingredientsActions = {
  getIngredients : token => dispatch => {
    dispatch(getIngredientsStart());
    axios
      .get('/ingredients.json?auth=' + token)
      .then(result => {
        dispatch(getIngredients(result.data));
      })
      .catch(err => dispatch(getIngredientsFail(err)));
  },
  addIngredient  : type => {
    return { type: actionTypes.ADD_INGREDIENT, ingredientType: type };
  },
  subIngredient  : type => {
    return { type: actionTypes.REMOVE_INGREDIENT, ingredientType: type };
  },
  postOrder      : (data, token) => dispatch => {
    dispatch(postOrderStart());
    axios
      .post('/orders.json?auth=' + token, data)
      .then(res => {
        dispatch(postOrder());
        UIkit.notification({
          message : 'Burger Ordered',
          timeout : 2000
        });
      })
      .catch(err => {
        dispatch(postOrderFail(err));
      });
  },
  goToOrder      : () => {
    return { type: actionTypes.GO_TO_ORDER };
  }
};
