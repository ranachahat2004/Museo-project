import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import {
  FaBars,
  FaUserCircle,
} from "react-icons/fa";

import AdminSidebar from "./AdminSidebar";

import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const { user } = useAuth();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f1e8",
      }}
    >
      {/* =========================
          SIDEBAR
      ========================= */}

      <AdminSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* =========================
          MAIN AREA
      ========================= */}

      <div
        style={{
          marginLeft: "260px",
          minHeight: "100vh",
        }}
        className="admin-main-area"
      >
        {/* =========================
            TOP BAR
        ========================= */}

        <nav
          className="navbar bg-white shadow-sm px-3 px-lg-4"
          style={{
            minHeight: "70px",
          }}
        >
          <div className="container-fluid">

            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              className="btn d-lg-none"
              style={{
                color: "#101820",
                fontSize: "22px",
              }}
              onClick={() =>
                setMobileOpen(
                  !mobileOpen
                )
              }
            >
              <FaBars />
            </button>

            {/* PAGE TITLE */}

            <div className="d-none d-md-block">
              <span
                className="fw-semibold"
                style={{
                  color: "#101820",
                }}
              >
                MUSEO Admin Panel
              </span>
            </div>

            {/* USER */}

            <div className="ms-auto d-flex align-items-center">
              <div className="text-end me-3 d-none d-sm-block">
                <div
                  className="fw-semibold"
                  style={{
                    color: "#101820",
                  }}
                >
                  {user?.firstName ||
                    "Admin"}{" "}
                  {user?.lastName || ""}
                </div>

                <small className="text-muted">
                  Administrator
                </small>
              </div>

              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "42px",
                  height: "42px",
                  backgroundColor:
                    "#e9dfcf",
                  color: "#b78342",
                  fontSize: "20px",
                }}
              >
                <FaUserCircle />
              </div>
            </div>

          </div>
        </nav>

        {/* =========================
            PAGE CONTENT
        ========================= */}

        <main>
          <Outlet />
        </main>
      </div>

      {/* =========================
          RESPONSIVE CSS
      ========================= */}

      <style>
        {`
          @media (max-width: 991.98px) {
            .admin-main-area {
              margin-left: 0 !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AdminLayout;