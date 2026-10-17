import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const AdminRoutes = () => {
  const {
    user,
    loading,
    isAuthenticated,
  } = useAuth();

  /* =========================
     CHECKING AUTH
  ========================= */

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
          ></div>

          <p className="mt-3 text-muted">
            Checking admin access...
          </p>
        </div>
      </div>
    );
  }

  /* =========================
     NOT LOGGED IN
  ========================= */

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  /* =========================
     NOT ADMIN
  ========================= */

  if (user?.role !== "admin") {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <Outlet />;
};

export default AdminRoutes;