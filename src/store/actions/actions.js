import * as actionTypes from './actionTypes';
import axios from '../../axios';

const getIngredients = data => {
  return { type: actionTypes.GET_INGREDIENTS, data };
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
	submitOrder: data => dispatch => {
		axios.post('/orders.json', data).then(() => {
			dispatch(this.resetIngredients())
		})
	}
};
