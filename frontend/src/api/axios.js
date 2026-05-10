import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const authData = localStorage.getItem('auth-storage');
        if (authData) {
            try {
                const { state } = JSON.parse(authData);
                const token = state.token;

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (e) {
                console.error('Помилка парсингу auth-storage:', e);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        if (status !== 400 && status !== 404 && status !== 401) {
            console.error('Критична помилка API:', error.response?.data || error.message);
        }
        if (status === 401) {
            console.warn('Сесія застаріла або токен відсутній.');
        }

        return Promise.reject(error);
    }
);

export default api;
