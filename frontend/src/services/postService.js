import api from '../api/axios';

export const postService = {
    getAll: async ({ page = 1, limit = 9, route = 'feeds', search = {} }) => {
        const endpointMap = {
            feeds: '/posts',
            personal: '/posts/personal-posts',
        };

        const { data } = await api.get(endpointMap[route] ?? '/posts', {
            params: {
                page,
                per_page: limit,
                ...search
            },
        });

        return data;;
    },

    getById: async (id) => {
        const { data } = await api.get(`/posts/${id}`);
        return data;
    },

    create: async (payload) => {
        const { data } = await api.post('/posts', payload);
        return data;
    },

    update: async (id, payload) => {
        const { data } = await api.put(`/posts/${id}`, payload);
        return data;
    },

    updateTag: async (id, payload) => {
        const { data } = await api.put(`/posts/${id}/update-tags`, payload);
        return data;
    },

    delete: async (id) => {
        const { data } = await api.delete(`/posts/${id}`);
        return data;
    },
};
