import { apiConfig } from '@/config/config';
import axios from 'axios';

axios.defaults.baseURL = `${apiConfig.API_URL}/api`;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

const currentLang = () => {
    return localStorage.getItem('lang');
}

axios.interceptors.request.use(
    (config) => {

        const language = currentLang();
        config.headers['Accept-Language'] = `${language}`;

        config.withCredentials = true;

        return config;
    },

    (error) => Promise.reject(error)
);

export const request = (config) => axios.request({ responseType: 'json', method: 'get', ...config });
export const get = request;
export const post = (config) => request({ ...config, method: 'post' });
export const put = (config) => request({ ...config, method: 'put' });
export const del = (config) => request({ ...config, method: 'delete' });
