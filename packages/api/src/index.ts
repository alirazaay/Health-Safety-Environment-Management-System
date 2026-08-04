import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const reportClient = {
  list: (params?: Record<string, unknown>) => apiClient.get('/reports', { params }),
  exportPerformance: (payload: Record<string, unknown>) => apiClient.post('/reports/export', payload),
};
