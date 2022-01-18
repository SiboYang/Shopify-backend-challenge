import axios from 'axios';
const instance = axios.create({baseURL: 'https://shopify-sibo.herokuapp.com/'});
export default instance