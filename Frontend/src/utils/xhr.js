import { apiConfig } from '@/config/config';
import { refreshTokenService } from '@/modules/auth/services/authService';
import axios from 'axios';
import { toast } from 'sonner';

let hasShownSessionExpired = false;
let isRefreshing = false;

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

// axios.interceptors.response.use(
//     (response) => response,
//     async (error) => {

//         const originalRequest = error.config;

//         if(error?.response?.status === 401 && !originalRequest._retry){

//             originalRequest._retry = true;

//             if(!isRefreshing){
//                 isRefreshing = true;

//                 try {
//                     const response = await refreshTokenService();
//                     isRefreshing = false;

//                     return axios(originalRequest);
//                 } catch (error) {
//                     isRefreshing = false;

//                     if(error?.response?.status === 401 && !hasShownSessionExpired){
//                         hasShownSessionExpired = true;

//                         toast.info("Your session has expired, you will be redirected soon");
//                         setTimeout(() => {
//                             window.location.href = '/login';
//                         }, 4000);
//                     }       
                    
//                     return Promise.reject(error);
//                 }
//             }
//             return Promise.reject(error);
//         }
//         return Promise.reject(error);
//     }
// )

export const request = (config) => axios.request({ responseType: 'json', method: 'get', ...config });
export const get = request;
export const post = (config) => request({ ...config, method: 'post' });
export const patch = (config) => request({ ...config, method: 'patch' });
export const put = (config) => request({ ...config, method: 'put' });
export const del = (config) => request({ ...config, method: 'delete' });
