import axios from 'axios';
import { toast } from 'react-toastify';

//base url to make requests to the database
const instances = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
});

instances.interceptors.request.use(
  (config: any) => {
    // ** Get token from localStorage
    const accessToken = localStorage.getItem('accessToken');

    // ** If token is present add it to request's Authorization Header
    if (accessToken) {
      // localStorage.setItem('EXPIRED_TOKEN', false)
      // ** eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default instances;
