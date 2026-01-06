import axios, { AxiosError, AxiosInstance } from 'axios';
import { SecureStorage } from './secureStorage';
import router from '@/router';

const API_URL = import.meta.env.VITE_API_URL as string;

let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

function processQueue(token: string | null) {
  refreshQueue.forEach(cb => cb(token));
  refreshQueue = [];
}

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

/**
 * REQUEST INTERCEPTOR
 * Ajoute automatiquement le JWT
 */
api.interceptors.request.use(
  async config => {
    const token = await SecureStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 * Gère expiration de session + refresh token
 */
api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(resolve => {
          refreshQueue.push(token => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await SecureStorage.getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post(
          `${API_URL}/auth/refresh`,
          { refresh_token: refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        await SecureStorage.setTokens(
          data.access_token,
          data.refresh_token
        );

        api.defaults.headers.common.Authorization =
          `Bearer ${data.access_token}`;

        processQueue(data.access_token);
        return api(originalRequest);
      } catch (e) {
        processQueue(null);
        await SecureStorage.clear();
        router.replace('/login');
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status === 403) {
      // Optionnel : page accès refusé
      console.warn('Accès refusé');
    }

    return Promise.reject(error);
  }
);

export default api;
