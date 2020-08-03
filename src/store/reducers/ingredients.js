/* eslint-disable default-case */
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients : null,
  price       : 15,
  loading     : false,
  error       : null,
  ordered     : false
};

const INGREDIENT_PRICES = {
  salad  : 12,
  cheese : 15,
  meat   : 20,
  bacon  : 17
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case actionTypes.GET_INGREDIENTS_START:
      newState.loading = true;
      break;
    case actionTypes.GET_INGREDIENTS:
      newState.ingredients = action.data;
      newState.loading = false;
      newState.error = null;
      newState.price = 15;
      break;
    case actionTypes.GET_INGREDIENTS_FAIL:
      newState.error = action.error.message;
      newState.loading = false;
      break;
    case actionTypes.POST_ORDER_START:
      newState.loading = true;
      break;
    case actionTypes.POST_ORDER:
      newState.ordered = true;
      break;
    case actionTypes.POST_ORDER_FAIL:
      newState.error = action.error.message;
      newState.loading = false;
      break;
    case actionTypes.GO_TO_ORDER:
      newState.ordered = false;
      break;
    case actionTypes.ADD_INGREDIENT:
      newState.ingredients = {
        ...state.ingredients,
        [action.ingredientType]: state.ingredients[action.ingredientType] + 1
      };
      newState.price = state.price + INGREDIENT_PRICES[action.ingredientType];
      break;
    case actionTypes.REMOVE_INGREDIENT:
      newState.ingredients = {
        ...state.ingredients,
        [action.ingredientType]: state.ingredients[action.ingredientType] - 1
      };
      newState.price = state.price - INGREDIENT_PRICES[action.ingredientType];
  }
  return newState;
};

export default reducer;
