import React from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  FaTachometerAlt,
  FaGem,
  FaImages,
  FaTags,
  FaClock,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const AdminSidebar = ({
  mobileOpen,
  setMobileOpen,
}) => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/");

    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  const closeMobileMenu = () => {
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  const linkStyle = ({ isActive }) => ({
    color: isActive
      ? "#101820"
      : "#ffffff",

    backgroundColor: isActive
      ? "#d7ad7a"
      : "transparent",

    borderRadius: "8px",

    marginBottom: "6px",

    padding: "11px 14px",

    fontWeight: isActive
      ? "600"
      : "400",

    transition: "0.2s",
  });

  return (
    <>
      {/* MOBILE OVERLAY */}

      {mobileOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
          style={{
            backgroundColor:
              "rgba(0,0,0,0.5)",
            zIndex: 1040,
          }}
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* SIDEBAR */}

      <aside
        className={`position-fixed top-0 start-0 h-100 ${
          mobileOpen
            ? "translate-show"
            : ""
        }`}
        style={{
          width: "260px",
          backgroundColor: "#101820",
          zIndex: 1050,
          overflowY: "auto",
          transform:
            mobileOpen
              ? "translateX(0)"
              : undefined,
          transition:
            "transform 0.3s ease",
        }}
      >
        {/* LOGO */}

        <div
          className="p-4 border-bottom"
          style={{
            borderColor:
              "rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="fw-bold"
            style={{
              color: "#d7ad7a",
              fontSize: "25px",
              letterSpacing: "3px",
            }}
          >
            MUSEO
          </div>

          <small
            className="text-white-50"
          >
            Administration Panel
          </small>
        </div>

        {/* NAVIGATION */}

        <div className="p-3">
          <p
            className="text-uppercase small fw-bold mb-2"
            style={{
              color: "#b78342",
              letterSpacing: "1px",
            }}
          >
            Main Menu
          </p>

          <NavLink
            to="/admin"
            end
            className="d-flex align-items-center text-decoration-none"
            style={linkStyle}
            onClick={closeMobileMenu}
          >
            <FaTachometerAlt className="me-3" />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/artifacts"
            className="d-flex align-items-center text-decoration-none"
            style={linkStyle}
            onClick={closeMobileMenu}
          >
            <FaGem className="me-3" />
            Artifacts
          </NavLink>

          <NavLink
            to="/admin/exhibitions"
            className="d-flex align-items-center text-decoration-none"
            style={linkStyle}
            onClick={closeMobileMenu}
          >
            <FaImages className="me-3" />
            Exhibitions
          </NavLink>

          <NavLink
            to="/admin/categories"
            className="d-flex align-items-center text-decoration-none"
            style={linkStyle}
            onClick={closeMobileMenu}
          >
            <FaTags className="me-3" />
            Categories
          </NavLink>

          <NavLink
            to="/admin/timeline"
            className="d-flex align-items-center text-decoration-none"
            style={linkStyle}
            onClick={closeMobileMenu}
          >
            <FaClock className="me-3" />
            Timeline
          </NavLink>

          <NavLink
            to="/admin/users"
            className="d-flex align-items-center text-decoration-none"
            style={linkStyle}
            onClick={closeMobileMenu}
          >
            <FaUsers className="me-3" />
            Users
          </NavLink>

          <hr
            className="border-secondary"
          />

          <p
            className="text-uppercase small fw-bold mb-2"
            style={{
              color: "#b78342",
              letterSpacing: "1px",
            }}
          >
            Other
          </p>

          <NavLink
            to="/"
            className="d-flex align-items-center text-decoration-none"
            style={linkStyle}
            onClick={closeMobileMenu}
          >
            <FaHome className="me-3" />
            Visit Website
          </NavLink>

          <NavLink
            to="/admin/settings"
            className="d-flex align-items-center text-decoration-none"
            style={linkStyle}
            onClick={closeMobileMenu}
          >
            <FaCog className="me-3" />
            Settings
          </NavLink>

          <button
            type="button"
            className="btn w-100 text-start d-flex align-items-center mt-2"
            style={{
              color: "#ffb3b3",
              padding: "11px 14px",
            }}
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* DESKTOP / MOBILE STYLE */}

      <style>
        {`
          @media (max-width: 991.98px) {
            aside {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </>
  );
};

export default AdminSidebar;