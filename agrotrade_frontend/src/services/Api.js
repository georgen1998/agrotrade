import axios from 'axios';

export default () => axios.create({
  baseURL: 'https://agrotrade.shopitnow.gr/api',
  // baseURL: 'http://localhost:8081/api',
});
