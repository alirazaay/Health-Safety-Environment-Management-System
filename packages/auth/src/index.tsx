import { createContext, useContext, type ReactNode } from 'react';
import { create } from 'zustand';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  setSession: (user: AuthUser, token: string) => void;
  clearSession: () => void;
  hasRole: (role: string | string[]) => boolean;
}

const STORAGE_KEY = 'cbl-hse-auth';

const readSession = (): Pick<AuthState, 'user' | 'token'> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, token: null };
    return JSON.parse(raw);
  } catch {
    return { user: null, token: null };
  }
};

export const useAuthStore = create<AuthState>((set, get) => ({
  ...readSession(),
  setSession: (user, token) => {
    const session = { user, token };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    set(session);
  },
  clearSession: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null, token: null });
  },
  hasRole: (role) => {
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(get().user?.role ?? '');
  },
}));

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.clearSession);

  const login = () => {
    setSession(
      {
        id: 'demo-admin',
        name: 'Admin User',
        email: 'admin@cbl.com',
        role: 'ADMIN',
        department: 'All',
      },
      'local-demo-token',
    );
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: Boolean(user),
      isLoggingIn: false,
      error: null,
      login,
      logout: clearSession,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}

export function ProtectedRoute({ children, fallback }: { children: ReactNode; fallback: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : fallback;
}

export function usePermissions() {
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  return {
    userDepartment: user?.department ?? 'All',
    isDepartmentRestricted: () => Boolean(user?.department && !isAdmin && user.department !== 'All'),
    canViewReports: () => true,
    canExportCSV: () => true,
    canAddData: () => true,
    hasRole: useAuthStore((state) => state.hasRole),
  };
}
