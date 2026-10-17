import React from "react";

import {
  FaCog,
  FaShieldAlt,
  FaDatabase,
  FaServer,
} from "react-icons/fa";

const AdminSettings = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f1e8",
      }}
    >
      <div className="container-fluid py-4">
        <div className="px-3 px-lg-4">

          {/* HEADER */}

          <div className="mb-4">
            <p
              className="mb-1"
              style={{
                color: "#b78342",
                fontWeight: "600",
              }}
            >
              ADMINISTRATION
            </p>

            <h1
              className="fw-bold"
              style={{
                color: "#101820",
              }}
            >
              Settings
            </h1>

            <p className="text-muted">
              Manage basic MUSEO administration
              settings.
            </p>
          </div>

          {/* SETTINGS CARDS */}

          <div className="row g-4">

            {/* SYSTEM */}

            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">

                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor:
                          "#e9dfcf",
                        color: "#b78342",
                      }}
                    >
                      <FaCog />
                    </div>

                    <div>
                      <h5 className="fw-bold mb-0">
                        System Settings
                      </h5>

                      <small className="text-muted">
                        General configuration
                      </small>
                    </div>
                  </div>

                  <hr />

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Application Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value="MUSEO"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="form-label fw-semibold">
                      Application Type
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value="Interactive Digital Museum"
                      readOnly
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* SECURITY */}

            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">

                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor:
                          "#e9dfcf",
                        color: "#b78342",
                      }}
                    >
                      <FaShieldAlt />
                    </div>

                    <div>
                      <h5 className="fw-bold mb-0">
                        Security
                      </h5>

                      <small className="text-muted">
                        Admin access protection
                      </small>
                    </div>
                  </div>

                  <hr />

                  <div className="alert alert-success">
                    <strong>
                      Protected
                    </strong>

                    <br />

                    <small>
                      Admin routes are protected
                      using JWT authentication
                      and role-based authorization.
                    </small>
                  </div>

                  <div className="d-flex justify-content-between border-bottom py-2">
                    <span>
                      JWT Authentication
                    </span>

                    <span className="badge bg-success">
                      Enabled
                    </span>
                  </div>

                  <div className="d-flex justify-content-between py-2">
                    <span>
                      Admin Role Protection
                    </span>

                    <span className="badge bg-success">
                      Enabled
                    </span>
                  </div>

                </div>
              </div>
            </div>

            {/* DATABASE */}

            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">

                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor:
                          "#e9dfcf",
                        color: "#b78342",
                      }}
                    >
                      <FaDatabase />
                    </div>

                    <div>
                      <h5 className="fw-bold mb-0">
                        Database
                      </h5>

                      <small className="text-muted">
                        MUSEO data storage
                      </small>
                    </div>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>
                      Database
                    </span>

                    <strong>
                      MongoDB
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>
                      ODM
                    </span>

                    <strong>
                      Mongoose
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between py-2">
                    <span>
                      Status
                    </span>

                    <span className="badge bg-success">
                      Connected
                    </span>
                  </div>

                </div>
              </div>
            </div>

            {/* SERVER */}

            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">

                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor:
                          "#e9dfcf",
                        color: "#b78342",
                      }}
                    >
                      <FaServer />
                    </div>

                    <div>
                      <h5 className="fw-bold mb-0">
                        Backend Server
                      </h5>

                      <small className="text-muted">
                        API server information
                      </small>
                    </div>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>
                      Server
                    </span>

                    <strong>
                      Node.js
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>
                      Framework
                    </span>

                    <strong>
                      Express.js
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between py-2">
                    <span>
                      API
                    </span>

                    <span className="badge bg-success">
                      Active
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminSettings;