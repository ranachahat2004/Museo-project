import React, { useState } from "react";

import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  FaSearch,
  FaHeart,
  FaUserCircle,
  FaFolderOpen,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const [search, setSearch] =
    useState("");

  const [menuOpen, setMenuOpen] =
    useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) return;

    navigate(
      `/artifacts?search=${encodeURIComponent(
        value
      )}`
    );

    setSearch("");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();

    setMenuOpen(false);

    navigate("/");
  };

  const navLinkStyle = ({
    isActive,
  }) => ({
    color: isActive
      ? "#d7ad7a"
      : "#ffffff",
    fontWeight: isActive
      ? "600"
      : "400",
    padding: "8px 10px",
  });

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        backgroundColor: "#101820",
      }}
    >
      <div className="container">

        {/* LOGO */}

        <Link
          to="/"
          className="navbar-brand fw-bold"
          style={{
            color: "#d7ad7a",
            letterSpacing: "2px",
            fontSize: "24px",
          }}
          onClick={() =>
            setMenuOpen(false)
          }
        >
          MUSEO
        </Link>

        {/* MOBILE BUTTON */}

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          {menuOpen ? (
            <FaTimes color="#fff" />
          ) : (
            <FaBars color="#fff" />
          )}
        </button>

        <div
          className={`collapse navbar-collapse ${
            menuOpen ? "show" : ""
          }`}
        >

          {/* MAIN NAVIGATION */}

          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink
                to="/"
                style={navLinkStyle}
                className="nav-link"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/exhibitions"
                style={navLinkStyle}
                className="nav-link"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Exhibitions
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/artifacts"
                style={navLinkStyle}
                className="nav-link"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Artifacts
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/categories"
                style={navLinkStyle}
                className="nav-link"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Categories
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/timeline"
                style={navLinkStyle}
                className="nav-link"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Timeline
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/about"
                style={navLinkStyle}
                className="nav-link"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                About
              </NavLink>
            </li>

          </ul>

          {/* RIGHT SIDE */}

          <div className="d-flex align-items-center gap-2">

            {/* SEARCH */}

            <form
              onSubmit={handleSearch}
              className="d-flex"
            >
              <input
                type="search"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="form-control form-control-sm"
                placeholder="Search..."
                style={{
                  maxWidth: "130px",
                }}
              />

              <button
                type="submit"
                className="btn btn-sm ms-1"
                style={{
                  color: "#d7ad7a",
                  border:
                    "1px solid #b78342",
                }}
              >
                <FaSearch />
              </button>
            </form>

            {!isAuthenticated ? (
              <>
                <button
                  className="btn btn-sm"
                  style={{
                    color: "#fff",
                  }}
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                >
                  Login
                </button>

                <button
                  className="btn btn-sm text-white"
                  style={{
                    backgroundColor:
                      "#b78342",
                  }}
                  onClick={() => {
                    navigate("/register");
                    setMenuOpen(false);
                  }}
                >
                  Register
                </button>
              </>
            ) : (
              <div className="dropdown">

                <button
                  className="btn dropdown-toggle text-white"
                  data-bs-toggle="dropdown"
                  type="button"
                >
                  <FaUserCircle className="me-1" />

                  {user?.firstName ||
                    "Account"}
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow">

                  <li>
                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                    >
                      <FaUserCircle className="me-2" />
                      Profile
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/favorites"
                      className="dropdown-item"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                    >
                      <FaHeart className="me-2" />
                      Favorites
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/collections"
                      className="dropdown-item"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                    >
                      <FaFolderOpen className="me-2" />
                      My Collections
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="me-2" />
                      Logout
                    </button>
                  </li>

                </ul>

              </div>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;