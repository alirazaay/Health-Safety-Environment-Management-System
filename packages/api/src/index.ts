<<<<<<< HEAD
export { apiClient } from "./client";
export { configureTokenRefresh } from "./client";
export { authClient } from "./authClient";
export { dashboardClient } from "./dashboardClient";
export { reportClient } from "./reportClient";
export { uploadClient } from "./uploadClient";
export { tokenStore } from "./tokenStore";
export type { AuthTokens, BackendUser } from "./authClient";
=======
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
>>>>>>> d030ebd4e6389b4507a011215f9a73cb43997b41
