import React, {
  useEffect,
  useState,
} from "react";

import {
  FaUsers,
  FaUserCheck,
  FaUserSlash,
  FaSearch,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import {
  getAllUsers,
  updateUserStatus,
} from "../../services/adminService";

import Loading from "../../components/common/Loading";

import ErrorMessage from "../../components/common/ErrorMessage";

const AdminUsers = () => {
  const { token, user: currentUser } =
    useAuth();

  const [users, setUsers] =
    useState([]);

  const [filteredUsers, setFilteredUsers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [updatingId, setUpdatingId] =
    useState(null);

  /* =========================
     FETCH USERS
  ========================= */

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getAllUsers(token);

      const userList =
        response.users || [];

      setUsers(userList);
      setFilteredUsers(userList);
    } catch (error) {
      console.error(
        "Admin Users Error:",
        error
      );

      setError(
        error?.response?.data
          ?.message ||
          "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  /* =========================
     SEARCH USERS
  ========================= */

  useEffect(() => {
    const value =
      search.trim().toLowerCase();

    if (!value) {
      setFilteredUsers(users);
      return;
    }

    const result = users.filter(
      (user) => {
        const fullName =
          `${user.firstName || ""} ${
            user.lastName || ""
          }`.toLowerCase();

        const email =
          user.email?.toLowerCase() ||
          "";

        const role =
          user.role?.toLowerCase() ||
          "";

        return (
          fullName.includes(value) ||
          email.includes(value) ||
          role.includes(value)
        );
      }
    );

    setFilteredUsers(result);
  }, [search, users]);

  /* =========================
     UPDATE STATUS
  ========================= */

  const handleStatusChange = async (
    selectedUser
  ) => {
    if (
      selectedUser._id ===
      currentUser?.id
    ) {
      alert(
        "You cannot change your own account status."
      );

      return;
    }

    const newStatus =
      !selectedUser.isActive;

    const confirmation = window.confirm(
      newStatus
        ? "Activate this user?"
        : "Deactivate this user?"
    );

    if (!confirmation) {
      return;
    }

    try {
      setUpdatingId(
        selectedUser._id
      );

      await updateUserStatus(
        token,
        selectedUser._id,
        newStatus
      );

      setUsers((previousUsers) =>
        previousUsers.map((user) =>
          user._id ===
          selectedUser._id
            ? {
                ...user,
                isActive: newStatus,
              }
            : user
        )
      );
    } catch (error) {
      console.error(
        "Update User Status Error:",
        error
      );

      alert(
        error?.response?.data
          ?.message ||
          "Unable to update user status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

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
      <div className="container py-5">
        <ErrorMessage
          message={error}
        />
      </div>
    );
  }

  /* =========================
     COUNTS
  ========================= */

  const totalUsers =
    users.length;

  const activeUsers =
    users.filter(
      (user) => user.isActive
    ).length;

  const inactiveUsers =
    users.filter(
      (user) => !user.isActive
    ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f1e8",
      }}
    >
      {/* =========================
          HEADER
      ========================= */}

      <div className="container-fluid py-4">
        <div className="container-fluid px-3 px-lg-4">

          <div className="mb-4">
            <p
              className="mb-1"
              style={{
                color: "#b78342",
                fontWeight: "600",
              }}
            >
              USER MANAGEMENT
            </p>

            <h1
              className="fw-bold mb-2"
              style={{
                color: "#101820",
              }}
            >
              Users
            </h1>

            <p className="text-muted mb-0">
              Manage registered MUSEO
              users and their account
              status.
            </p>
          </div>

          {/* =========================
              SUMMARY CARDS
          ========================= */}

          <div className="row g-3 mb-4">

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center">
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
                    <FaUsers />
                  </div>

                  <div>
                    <small className="text-muted">
                      Total Users
                    </small>

                    <h4 className="fw-bold mb-0">
                      {totalUsers}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor:
                        "#dff2e1",
                      color: "#198754",
                    }}
                  >
                    <FaUserCheck />
                  </div>

                  <div>
                    <small className="text-muted">
                      Active Users
                    </small>

                    <h4 className="fw-bold mb-0">
                      {activeUsers}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor:
                        "#f8dddd",
                      color: "#dc3545",
                    }}
                  >
                    <FaUserSlash />
                  </div>

                  <div>
                    <small className="text-muted">
                      Inactive Users
                    </small>

                    <h4 className="fw-bold mb-0">
                      {inactiveUsers}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* =========================
              USER TABLE
          ========================= */}

          <div className="card border-0 shadow-sm">

            <div className="card-body p-3 p-lg-4">

              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

                <div>
                  <h5 className="fw-bold mb-1">
                    Registered Users
                  </h5>

                  <small className="text-muted">
                    {filteredUsers.length}{" "}
                    user
                    {filteredUsers.length !==
                    1
                      ? "s"
                      : ""}
                    {" "}found
                  </small>
                </div>

                <div
                  className="input-group"
                  style={{
                    maxWidth: "350px",
                  }}
                >
                  <span className="input-group-text bg-white">
                    <FaSearch
                      style={{
                        color:
                          "#b78342",
                      }}
                    />
                  </span>

                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                  />
                </div>

              </div>

              {/* EMPTY */}

              {filteredUsers.length ===
              0 ? (
                <div className="text-center py-5">
                  <FaUsers
                    size={45}
                    style={{
                      color:
                        "#b78342",
                    }}
                  />

                  <h5 className="mt-3">
                    No users found
                  </h5>

                  <p className="text-muted">
                    Try changing your
                    search.
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle">

                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Joined</th>
                        <th className="text-end">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredUsers.map(
                        (selectedUser) => (
                          <tr
                            key={
                              selectedUser._id
                            }
                          >

                            <td>
                              <div className="d-flex align-items-center">

                                <div
                                  className="rounded-circle d-flex align-items-center justify-content-center me-2"
                                  style={{
                                    width:
                                      "40px",
                                    height:
                                      "40px",
                                    backgroundColor:
                                      "#e9dfcf",
                                    color:
                                      "#b78342",
                                    fontWeight:
                                      "600",
                                  }}
                                >
                                  {selectedUser
                                    .firstName
                                    ?.charAt(
                                      0
                                    )
                                    ?.toUpperCase()}
                                </div>

                                <div>
                                  <div className="fw-semibold">
                                    {
                                      selectedUser.firstName
                                    }{" "}
                                    {
                                      selectedUser.lastName
                                    }
                                  </div>
                                </div>

                              </div>
                            </td>

                            <td>
                              <span className="text-muted">
                                {
                                  selectedUser.email
                                }
                              </span>
                            </td>

                            <td>
                              <span
                                className="badge"
                                style={{
                                  backgroundColor:
                                    selectedUser.role ===
                                    "admin"
                                      ? "#101820"
                                      : "#e9dfcf",
                                  color:
                                    selectedUser.role ===
                                    "admin"
                                      ? "#ffffff"
                                      : "#101820",
                                }}
                              >
                                {
                                  selectedUser.role
                                }
                              </span>
                            </td>

                            <td>
                              <span
                                className={`badge ${
                                  selectedUser.isActive
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}
                              >
                                {selectedUser.isActive
                                  ? "Active"
                                  : "Inactive"}
                              </span>
                            </td>

                            <td>
                              <small className="text-muted">
                                {selectedUser.createdAt
                                  ? new Date(
                                      selectedUser.createdAt
                                    ).toLocaleDateString()
                                  : "-"}
                              </small>
                            </td>

                            <td className="text-end">

                              {selectedUser._id ===
                              currentUser?.id ? (
                                <span className="badge bg-secondary">
                                  Current Admin
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  className={`btn btn-sm ${
                                    selectedUser.isActive
                                      ? "btn-outline-danger"
                                      : "btn-outline-success"
                                  }`}
                                  disabled={
                                    updatingId ===
                                    selectedUser._id
                                  }
                                  onClick={() =>
                                    handleStatusChange(
                                      selectedUser
                                    )
                                  }
                                >
                                  {updatingId ===
                                  selectedUser._id
                                    ? "Updating..."
                                    : selectedUser.isActive
                                    ? "Deactivate"
                                    : "Activate"}
                                </button>
                              )}

                            </td>

                          </tr>
                        )
                      )}
                    </tbody>

                  </table>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminUsers;