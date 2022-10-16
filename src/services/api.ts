import axios from 'axios';
import {AuthResponse} from "../helpers/types";

export const API_URL = `https://api.river-fuler.space/api`;

const instance = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

instance.interceptors.request.use((config:any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

instance.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return instance.request(originalRequest);
        } catch (e) {
            console.log('No auth')
        }
    }
    throw error;
});

export default instance;