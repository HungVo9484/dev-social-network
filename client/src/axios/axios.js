import axios from 'axios';

const instance = axios.create({ baseURL: 'https://warm-plains-05427.herokuapp.com' });

export default instance;