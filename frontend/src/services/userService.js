import api from '../api/axios';
import { fileUploadConfig } from '../utils/generic.fn';

export const userService = {
    updateProfile: async (payload) => {
        const { data } = await api.post('/user/profile', payload, fileUploadConfig);
        return data;
    },

    changePassword: async (payload) => {
        const { data } = await api.post('/user/change-password', payload);
        return data;
    },

    me: async () => {
        const { data }  = await api.get('/auth/me');
        return data?.data;
    },
};
