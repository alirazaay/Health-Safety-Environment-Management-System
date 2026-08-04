import { Routes, Route, Navigate } from 'react-router-dom';
<<<<<<< HEAD
=======
import { useState, useEffect } from 'react';
>>>>>>> d030ebd4e6389b4507a011215f9a73cb43997b41
import { ProtectedRoute, useAuth } from '@cbl/auth';
import { Dashboard } from './pages/Dashboard';

import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Reports } from './pages/Reports';
import { Profile } from './pages/Profile';
import { DataEntrySection } from './components/DataEntrySection';
<<<<<<< HEAD
import { ALL_SECTIONS } from './config/sectionSchemas';
=======
import { ALL_SECTIONS, setDepartmentOptions } from './config/sectionSchemas';
import { setDepartments } from './config/constants';
import { apiClient } from '@cbl/api';
>>>>>>> d030ebd4e6389b4507a011215f9a73cb43997b41
import { FilterProvider } from './context/FilterContext';
import { ThemeProvider } from './context/ThemeContext';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@cbl/ui';



const LoginPage = () => {
  const { login, isLoggingIn, isAuthenticated, error } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <Card className="w-full max-w-md glass border-border shadow-xl z-10">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="mx-auto bg-primary text-primary-foreground w-14 h-14 rounded-lg flex items-center justify-center font-bold text-2xl mb-3 shadow-lg shadow-primary/20">
            LU
          </div>
          <CardTitle className="text-2xl text-foreground tracking-tight font-bold">CBL Sukkur Plant</CardTitle>
          <p className="text-sm text-muted-foreground font-medium">Management Dashboard Portal</p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-danger/10 text-danger text-sm rounded-md border border-danger/20 text-center">
              {error}
            </div>
          )}
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 text-base shadow-md transition-all hover:shadow-lg"
            onClick={login}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Authenticating..." : "Sign in with Microsoft SSO"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

function App() {
<<<<<<< HEAD
=======
  const { isAuthenticated } = useAuth();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsInitializing(false);
      return;
    }

    const initApp = async () => {
      try {
        const response = await apiClient.get('/departments');
        const depts = response.data?.data?.map((d: any) => d.name) || [];
        setDepartments(depts);
        setDepartmentOptions(depts);
      } catch (err) {
        console.error('Failed to load departments', err);
      } finally {
        setIsInitializing(false);
      }
    };

    initApp();
  }, [isAuthenticated]);

  if (isInitializing) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="w-8 h-8 border-4 border-[#CB0017] border-t-transparent rounded-full animate-spin"></div></div>;
  }

>>>>>>> d030ebd4e6389b4507a011215f9a73cb43997b41
  return (
    <ThemeProvider>
      <FilterProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Management Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute fallback={<Navigate to="/login" />}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* New Sidebar Routes */}
          <Route path="/analytics" element={<ProtectedRoute fallback={<Navigate to="/login" />}><Analytics /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute fallback={<Navigate to="/login" />}><Settings /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute fallback={<Navigate to="/login" />}><Reports /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute fallback={<Navigate to="/login" />}><Profile /></ProtectedRoute>} />

          {/* Dynamic Data Entry Sections */}
          {ALL_SECTIONS.map(section => (
            <Route 
              key={section.id} 
              path={section.path} 
              element={
                <ProtectedRoute fallback={<Navigate to="/login" />}>
                  <DataEntrySection schema={section} />
                </ProtectedRoute>
              } 
            />
          ))}

        {/* Default route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </FilterProvider>
    </ThemeProvider>
  );
}

export default App;
