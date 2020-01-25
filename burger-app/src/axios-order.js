import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerapp-37a2c.firebaseio.com/'
});

export default instance;