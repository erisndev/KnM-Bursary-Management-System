import { Navigate, useLocation } from 'react-router-dom';
import { validateToken, getToken, clearAuth } from '@/services/auth';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = getToken();
  const validation = validateToken(token);

  if (!validation.valid) {
    // Clear invalid auth data
    clearAuth();

    // Navigate to login without showing toast here
    // The Login page can show the message from state if needed
    return (
      <Navigate
        to="/login"
        replace
        state={{ 
          from: location.pathname,
          message: validation.reason === 'expired' 
            ? 'Your session has expired. Please log in again.'
            : validation.reason === 'invalid'
            ? 'Your session is invalid. Please log in again.'
            : 'You need to log in to access this page.'
        }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
