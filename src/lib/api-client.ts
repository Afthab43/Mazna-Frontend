import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response Interceptor for handling CSRF and Silent Refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Never hard-redirect on /auth/me 401 — it is the session check that runs on every
      // page load. If it fails (unauthenticated), AuthProvider falls back to localStorage.
      if (originalRequest.url?.includes('/auth/me')) {
        return Promise.reject(error);
      }
      originalRequest._retry = true;
      try {
        await apiClient.post('/auth/refresh');
        return apiClient(originalRequest);
      } catch (refreshError) {
        if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);
