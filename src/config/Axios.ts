import axios from 'axios';

const AXIOS = axios.create({
  baseURL: `${process.env.REACT_APP_API_PATH}`,
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 60000,
});

export default AXIOS;