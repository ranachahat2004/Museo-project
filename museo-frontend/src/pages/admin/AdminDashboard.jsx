import React, {
  useEffect,
  useState,
} from "react";

import {
  FaGem,
  FaImages,
  FaTags,
  FaClock,
  FaUsers,
  FaStar,
  FaUserCheck,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import {
  getAdminDashboard,
} from "../../services/adminService";

import Loading from "../../components/common/Loading";

import ErrorMessage from "../../components/common/ErrorMessage";

const AdminDashboard = () => {
  const {
    user,
    token,
  } = useAuth();

  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =========================
     FETCH DASHBOARD
  ========================= */

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      setError("");

      const response =
        await getAdminDashboard(
          token
        );

      setDashboard(
        response.dashboard
      );
    } catch (error) {
      console.error(
        "Admin Dashboard Error:",
        error
      );

      setError(
        error?.response?.data
          ?.message ||
          "Unable to load admin dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboard();
    }
  }, [token]);

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return <Loading />;
  }

  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <div
        className="container py-5"
        style={{
          minHeight: "80vh",
        }}
      >
        <ErrorMessage
          message={error}
        />
      </div>
    );
  }

  /* =========================
     STAT CARDS
  ========================= */

  const stats = [
    {
      title: "Total Users",
      value:
        dashboard?.totalUsers || 0,
      icon: <FaUsers />,
      description:
        "Registered users",
    },

    {
      title: "Active Users",
      value:
        dashboard?.activeUsers || 0,
      icon: <FaUserCheck />,
      description:
        "Currently active",
    },

    {
      title: "Artifacts",
      value:
        dashboard?.totalArtifacts || 0,
      icon: <FaGem />,
      description:
        "Museum artifacts",
    },

    {
      title: "Exhibitions",
      value:
        dashboard?.totalExhibitions || 0,
      icon: <FaImages />,
      description:
        "Museum exhibitions",
    },

    {
      title: "Categories",
      value:
        dashboard?.totalCategories || 0,
      icon: <FaTags />,
      description:
        "Artifact categories",
    },

    {
      title: "Timeline Events",
      value:
        dashboard?.totalTimelineEvents || 0,
      icon: <FaClock />,
      description:
        "Historical events",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#f5f1e8",
        minHeight: "100vh",
      }}
    >
      {/* =========================
          HEADER
      ========================= */}

      <div
        className="container-fluid py-4"
        style={{
          backgroundColor: "#101820",
        }}
      >
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <p
                className="mb-1"
                style={{
                  color: "#d7ad7a",
                }}
              >
                MUSEO ADMINISTRATION
              </p>

              <h1 className="text-white fw-bold mb-1">
                Admin Dashboard
              </h1>

              <p className="text-white-50 mb-0">
                Welcome back,{" "}
                <span
                  className="text-white"
                >
                  {user?.firstName ||
                    "Admin"}
                </span>
                . Manage your digital
                museum from here.
              </p>
            </div>

            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "60px",
                height: "60px",
                backgroundColor:
                  "#b78342",
                color: "#ffffff",
                fontSize: "25px",
              }}
            >
              {user?.firstName
                ?.charAt(0)
                ?.toUpperCase() ||
                "A"}
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          DASHBOARD CONTENT
      ========================= */}

      <div className="container py-5">

        {/* STAT CARDS */}

        <div className="row g-4">
          {stats.map(
            (stat, index) => (
              <div
                className="col-12 col-sm-6 col-xl-4"
                key={index}
              >
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: "15px",
                  }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <p className="text-muted mb-2">
                          {stat.title}
                        </p>

                        <h2
                          className="fw-bold mb-1"
                          style={{
                            color:
                              "#101820",
                          }}
                        >
                          {stat.value}
                        </h2>

                        <small className="text-muted">
                          {
                            stat.description
                          }
                        </small>
                      </div>

                      <div
                        className="d-flex align-items-center justify-content-center rounded-3"
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor:
                            "#e9dfcf",
                          color:
                            "#b78342",
                          fontSize:
                            "21px",
                        }}
                      >
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* =========================
            FEATURED SUMMARY
        ========================= */}

        <div className="row g-4 mt-2">

          <div className="col-lg-6">
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderRadius: "15px",
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor:
                        "#e9dfcf",
                      color:
                        "#b78342",
                    }}
                  >
                    <FaStar />
                  </div>

                  <div>
                    <h5 className="fw-bold mb-1">
                      Featured Artifacts
                    </h5>

                    <p className="text-muted mb-0">
                      Highlighted museum
                      artifacts
                    </p>
                  </div>
                </div>

                <h2
                  className="display-5 fw-bold"
                  style={{
                    color: "#b78342",
                  }}
                >
                  {
                    dashboard?.featuredArtifacts ||
                    0
                  }
                </h2>

                <p className="text-muted mb-0">
                  artifacts are currently
                  marked as featured.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderRadius: "15px",
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor:
                        "#e9dfcf",
                      color:
                        "#b78342",
                    }}
                  >
                    <FaImages />
                  </div>

                  <div>
                    <h5 className="fw-bold mb-1">
                      Featured Exhibitions
                    </h5>

                    <p className="text-muted mb-0">
                      Highlighted exhibitions
                    </p>
                  </div>
                </div>

                <h2
                  className="display-5 fw-bold"
                  style={{
                    color: "#b78342",
                  }}
                >
                  {
                    dashboard?.featuredExhibitions ||
                    0
                  }
                </h2>

                <p className="text-muted mb-0">
                  exhibitions are currently
                  marked as featured.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* =========================
            INFORMATION BOX
        ========================= */}

        <div
          className="mt-4 p-4 rounded-4"
          style={{
            backgroundColor:
              "#101820",
          }}
        >
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h4 className="text-white fw-bold">
                Manage MUSEO
              </h4>

              <p className="text-white-50 mb-lg-0">
                Use the admin panel to manage
                artifacts, exhibitions,
                categories, timeline events
                and registered users.
              </p>
            </div>

            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
              <span
                className="badge px-3 py-2"
                style={{
                  backgroundColor:
                    "#b78342",
                  color: "#ffffff",
                  fontSize: "14px",
                }}
              >
                Admin Access
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;