import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const authActions = login => dispatch => {
  dispatch({ type: actionTypes.AUTH_START });
  axios
    .post('/login.json', login)
    .then(res => dispatch({ type: actionTypes.AUTH_SUCCESS, auth: res }))
    .catch(err => dispatch({ type: actionTypes.AUTH_FAIL, error: err }));
};
