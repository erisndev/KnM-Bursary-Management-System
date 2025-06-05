import { useRef } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const hasShownToast = useRef(false);

  console.log("Token:", token);

  if (!token) {
    if (!hasShownToast.current) {
      toast.error("You need to log in to access this page.");
      hasShownToast.current = true;
    }
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "You need to log in to access this page." }}
      />
    );
  }

  if (token === "expired") {
    if (!hasShownToast.current) {
      toast.error("Your session has expired. Please log in again.");
      hasShownToast.current = true;
    }
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "Your session has expired. Please log in again." }}
      />
    );
  }

  if (token === "invalid") {
    if (!hasShownToast.current) {
      toast.error("Your session is invalid. Please log in again.");
      hasShownToast.current = true;
    }
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "Your session is invalid. Please log in again." }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
