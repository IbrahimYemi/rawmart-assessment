import api from '../api/axios';

export const commentService = {
    create: async ({ postId, text }) => {
        const { data } = await api.post(`/posts/${postId}/comments`, { text });
        return data;
    },

    update: async ({ postId, commentId, text }) => {
        const { data } = await api.put(`/posts/${postId}/comments/${commentId}`, { text });
        return data;
    },

    delete: async ({ postId, commentId }) => {
        const { data } = await api.delete(`/posts/${postId}/comments/${commentId}`);
        return data;
    },
};
