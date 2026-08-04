export const env = {
  nodeEnv: (typeof process !== 'undefined' && process.env.NODE_ENV) || 'development',
  apiUrl: (typeof process !== 'undefined' && process.env.VITE_API_URL) || 'http://localhost:5000/api/v1',
  port: Number((typeof process !== 'undefined' && process.env.PORT) || 5000),
};

export const APP_NAME = 'CBL Power Plant Safety Management System';

export const ROLES = {
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  HSE_MANAGER: 'HSE_MANAGER',
  STAFF: 'STAFF',
} as const;
