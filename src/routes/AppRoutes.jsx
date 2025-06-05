// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ApplicationForm from "../pages/ApplicationForm";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contact from "../pages/Contact";
import MainLayout from "@/Layouts/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import ForgotPasswordFlow from "@/components/forgotPassword/ForgotPasswordFlow";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/apply"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ApplicationForm />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />
      <Route
        path="/register"
        element={
          <MainLayout>
            <Register />
          </MainLayout>
        }
      />

      <Route
        path="/contact"
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />
      <Route path="/forgot-password" element={<ForgotPasswordFlow />} />
    </Routes>
  );
};

export default AppRoutes;
