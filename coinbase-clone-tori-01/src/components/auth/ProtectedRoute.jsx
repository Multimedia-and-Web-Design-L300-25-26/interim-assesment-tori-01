import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * ProtectedRoute — wraps a component and redirects unauthenticated users to /signin.
 * Preserves the intended destination via location state so the user can be
 * redirected back after logging in.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show a minimal loading state while verifying session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F9FB]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm font-medium">Verifying your session…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to signin, preserving where the user was trying to go
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
