<<<<<<< HEAD
import { apiClient } from "./client";

export interface UploadProgress {
  loaded: number;
  total?: number;
  percent: number;
}

export const uploadClient = {
  upload: async (file: File, metadata: Record<string, unknown> = {}, onProgress?: (progress: UploadProgress) => void) => {
    const formData = new FormData();
    formData.append("file", file);
    Object.entries(metadata).forEach(([key, value]) => formData.append(key, String(value)));
    return apiClient.post("/attachments", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => onProgress?.({
        loaded: event.loaded,
        total: event.total,
        percent: event.total ? Math.round((event.loaded / event.total) * 100) : 0,
      }),
=======
import { apiClient } from './index';

export const uploadClient = {
  async upload(file: File, metadata: Record<string, string> = {}) {
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(metadata).forEach(([key, value]) => formData.append(key, value));
    return apiClient.post('/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
>>>>>>> d030ebd4e6389b4507a011215f9a73cb43997b41
    });
  },
};
