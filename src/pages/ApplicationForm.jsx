// This page is no longer used directly.
// The application form is now accessible from the Dashboard.
// Redirects to /dashboard?tab=apply via AppRoutes.

import { Navigate } from 'react-router-dom';

const Apply = () => {
  return <Navigate to="/dashboard?tab=apply" replace />;
};

export default Apply;
