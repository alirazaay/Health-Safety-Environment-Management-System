import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  try {
    const session = JSON.parse(localStorage.getItem('cbl-hse-auth') || '{}');
    if (session.token) config.headers.Authorization = `Bearer ${session.token}`;
  } catch {
    // Ignore malformed local sessions and let the API handle authentication.
  }
  return config;
});

export const reportClient = {
  list: (params?: Record<string, unknown>) => apiClient.get('/reports', { params }),
  exportPerformance: (payload: Record<string, unknown>) => apiClient.post('/reports/export', payload),
};
