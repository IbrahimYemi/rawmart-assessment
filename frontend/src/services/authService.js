import api from '../api/axios';
import { fileUploadConfig } from '../utils/generic.fn';

export const authService = {
  login: async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },

  register: async (payload) => {
    const { data } = await api.post('/auth/register', payload, fileUploadConfig);
    return data;
  },

  logout: async () => {
    await api.post('/auth/logout');
  },
};
