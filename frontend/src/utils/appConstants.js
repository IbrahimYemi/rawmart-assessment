export const APP_CONSTANTS = {
    APP_NAME: import.meta.env.VITE_APP_NAME || 'Rawmart Blog App',
    BUSINESS_NAME: import.meta.env.VITE_BUSINESS_NAME || 'RAWMART',
    APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:3000',
    MOCK_MODE: import.meta.env.VITE_MOCK_MODE || false,
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',

    STORAGE_KEYS: {
        AUTH_USER: 'auth-user',
        AUTH_TOKEN: 'auth-token',
        RETURN_URL: 'return-url',
    },

    QUERY_KEYS: {
        FEED: 'feed',
        FEEDS: 'feeds',
        AUTH_USER: 'auth-user',
    }
}