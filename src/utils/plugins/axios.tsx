import axios from 'axios';
import { toast } from 'react-toastify';

//base url to make requests to the database
const instances = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
});

// goong (like google map api)
export const goong = axios.create({
  baseURL: import.meta.env.VITE_GOONG_BASE_URL,
});

instances.interceptors.request.use(
  (config: any) => {
    // ** Get token from sessionStorage
    const accessToken = sessionStorage.getItem('accessToken');

    // ** If token is present add it to request's Authorization Header
    if (accessToken) {
      // sessionStorage.setItem('EXPIRED_TOKEN', false)
      // ** eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default instances;
