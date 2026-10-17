import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const {
    user,
    isAuthenticated,
    loading,
  } = useAuth();

  // Wait until authentication check is complete
  if (loading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: "#f5f1e8",
        }}
      >
        <div className="text-center">
          <div
            className="spinner-border"
            style={{
              color: "#b78342",
            }}
          />

          <p className="mt-3 text-muted">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // If the user is not logged in
  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Admin should use the admin panel
  if (user.role === "admin") {
    return (
      <Navigate
        to="/admin"
        replace
      />
    );
  }

  // Only normal users can access these routes
  if (user.role !== "user") {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Allow authenticated normal users
  return <Outlet />;
};

export default ProtectedRoute;