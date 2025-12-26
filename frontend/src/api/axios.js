import axios from 'axios';
import { notify } from '../components/Toast';
import { APP_CONSTANTS } from '../utils/appConstants';

const api = axios.create({
  baseURL: APP_CONSTANTS.API_URL || 'http://localhost:8080/api',
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    } else if (error.request) {
      console.error(error);
      console.error('Network error: No response from server');
    } else {
      notify.error('Error', 'Unexpected error occurred');
    }

    return Promise.reject(error);
  }
);

export default api;