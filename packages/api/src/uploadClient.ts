import { apiClient } from './index';

export const uploadClient = {
  async upload(file: File, metadata: Record<string, string> = {}) {
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(metadata).forEach(([key, value]) => formData.append(key, value));
    return apiClient.post('/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
