import axios from 'axios';

const instance = axios.create({
  baseURL : 'https://burgerbuilder-2c9ed.firebaseio.com/'
});

export default instance;
