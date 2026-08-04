export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: Record<string, unknown>;
}

export interface UserIdentity {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
}

export interface Paginated<T> {
  rows: T[];
  count: number;
  page: number;
  limit: number;
}

export interface SafetyRecord {
  id: string;
  status_id?: string;
  department_id?: string;
  date?: string;
  created_at?: string;
  updated_at?: string;
}
