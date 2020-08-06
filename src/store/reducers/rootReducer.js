import { combineReducers } from 'redux';
import ingredients from './ingredients';
import orders from './orders';
import auth from './auth';

const rootReducer = combineReducers({ ingredients, orders, auth });

export default rootReducer;
