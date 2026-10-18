import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "../components/common/Navbar";
import ScrollToTop from "../components/common/ScrollToTop";

// Public Pages
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Exhibitions from "../pages/public/Exhibitions";
import ExhibitionDetails from "../pages/public/ExhibitionDetails";
import Artifacts from "../pages/public/Artifacts";
import ArtifactDetails from "../pages/public/ArtifactDetails";
import Categories from "../pages/public/Categories";
import Timeline from "../pages/public/Timeline";

// Authentication Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";

// User Pages
import Profile from "../pages/user/Profile";
import UserDashboard from "../pages/user/UserDashboard";
import MyCollections from "../pages/user/MyCollections";
import CollectionDetails from "../pages/user/CollectionDetails";
import Favorites from "../pages/user/Favorites";

// Route Protection
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminRoute from "../routes/AdminRoutes";

// Admin Components
import AdminLayout from "../components/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminSettings from "../pages/admin/AdminSettings";

// Hide public navbar on admin pages
const NavbarController = () => {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  if (isAdminPage) {
    return null;
  }

  return <Navbar />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <NavbarController />

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route
          path="/exhibitions"
          element={<Exhibitions />}
        />

        <Route
          path="/exhibitions/:id"
          element={<ExhibitionDetails />}
        />

        <Route
          path="/artifacts"
          element={<Artifacts />}
        />

        <Route
          path="/artifacts/:id"
          element={<ArtifactDetails />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/timeline"
          element={<Timeline />}
        />

        {/* ================= AUTH ROUTES ================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/verify-email"
          element={<VerifyEmail />}
        />

        {/* ================= USER ROUTES ================= */}

        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<UserDashboard />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/collections"
            element={<MyCollections />}
          />

          <Route
            path="/collections/:id"
            element={<CollectionDetails />}
          />

          <Route
            path="/favorites"
            element={<Favorites />}
          />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}

        <Route element={<AdminRoute />}>
          <Route
            path="/admin"
            element={<AdminLayout />}
          >
            <Route
              index
              element={<AdminDashboard />}
            />

            <Route
              path="users"
              element={<AdminUsers />}
            />

            <Route
              path="settings"
              element={<AdminSettings />}
            />

            <Route
              path="artifacts"
              element={
                <div className="p-5">
                  <h2>Manage Artifacts</h2>
                  <p className="text-muted">
                    Artifact management will be added next.
                  </p>
                </div>
              }
            />

            <Route
              path="exhibitions"
              element={
                <div className="p-5">
                  <h2>Manage Exhibitions</h2>
                  <p className="text-muted">
                    Exhibition management will be added next.
                  </p>
                </div>
              }
            />

            <Route
              path="categories"
              element={
                <div className="p-5">
                  <h2>Manage Categories</h2>
                  <p className="text-muted">
                    Category management will be added next.
                  </p>
                </div>
              }
            />

            <Route
              path="timeline"
              element={
                <div className="p-5">
                  <h2>Manage Timeline</h2>
                  <p className="text-muted">
                    Timeline management will be added next.
                  </p>
                </div>
              }
            />
          </Route>
        </Route>

        {/* ================= 404 PAGE ================= */}

        <Route
          path="*"
          element={
            <div
              className="min-vh-100 d-flex align-items-center justify-content-center text-center"
              style={{ backgroundColor: "#f5f1e8" }}
            >
              <div>
                <h1
                  className="display-1 fw-bold"
                  style={{ color: "#b78342" }}
                >
                  404
                </h1>

                <h3
                  className="fw-bold"
                  style={{ color: "#101820" }}
                >
                  Page Not Found
                </h3>

                <p className="text-muted">
                  The page you are looking for does not exist.
                </p>

                <a
                  href="/"
                  className="btn text-white px-4"
                  style={{ backgroundColor: "#b78342" }}
                >
                  Back to Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;