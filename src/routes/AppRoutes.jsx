import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import LandingLayout from "@/Layouts/LandingLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";
import ForgotPasswordFlow from "@/components/forgotPassword/ForgotPasswordFlow";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public/Landing routes - redirect to dashboard if logged in */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <LandingLayout>
              <Home />
            </LandingLayout>
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      {/* /contact now redirects to home#contact section */}
      <Route path="/contact" element={<Navigate to="/" replace />} />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPasswordFlow />
          </PublicRoute>
        }
      />

      {/* Protected/Dashboard routes - own layout, no landing navbar */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Redirect /apply to dashboard (apply is now inside dashboard) */}
      <Route
        path="/apply"
        element={
          <ProtectedRoute>
            <Navigate to="/dashboard?tab=apply" replace />
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
