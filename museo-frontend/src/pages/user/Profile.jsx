import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiSave,
  FiEdit3,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";
import { updateMyProfile } from "../../services/userService";

const Profile = () => {
  const { user, token, getCurrentUser } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!formData.firstName || !formData.lastName) {
      setError("First name and last name are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await updateMyProfile(
        token,
        formData
      );

      setMessage(
        response.message ||
          "Profile updated successfully."
      );

      // Refresh user data in AuthContext
      await getCurrentUser();
    } catch (error) {
      console.error("Profile Update Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
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
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        backgroundColor: "#f5f1e8",
      }}
    >
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-5">
          <p
            className="text-uppercase fw-semibold mb-2"
            style={{
              color: "#b78342",
              letterSpacing: "3px",
            }}
          >
            My Account
          </p>

          <h1
            className="display-5 fw-bold"
            style={{
              color: "#101820",
            }}
          >
            My Profile
          </h1>

          <p className="text-muted">
            Manage your MUSEO account information
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-9">
            <div className="row g-4">
              {/* Profile Card */}
              <div className="col-12 col-md-4">
                <div className="card border-0 shadow-sm rounded-4 h-100">
                  <div className="card-body text-center p-4">
                    <div
                      className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "110px",
                        height: "110px",
                        backgroundColor: "#101820",
                        color: "#c89b5c",
                      }}
                    >
                      {user.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt="Profile"
                          className="rounded-circle w-100 h-100"
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <FiUser size={45} />
                      )}
                    </div>

                    <h4
                      className="fw-bold mb-1"
                      style={{
                        color: "#101820",
                      }}
                    >
                      {user.firstName}{" "}
                      {user.lastName}
                    </h4>

                    <p className="text-muted mb-3">
                      {user.email}
                    </p>

                    <span
                      className="badge rounded-pill px-3 py-2"
                      style={{
                        backgroundColor: "#e9dfcf",
                        color: "#101820",
                      }}
                    >
                      {user.role === "admin"
                        ? "Administrator"
                        : "Museum Visitor"}
                    </span>

                    <hr className="my-4" />

                    <div className="small text-muted">
                      <FiMail className="me-2" />
                      Account Email
                    </div>

                    <div className="fw-semibold mt-1">
                      {user.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Form */}
              <div className="col-12 col-md-8">
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-body p-4 p-md-5">
                    <div className="d-flex align-items-center mb-4">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: "45px",
                          height: "45px",
                          backgroundColor: "#e9dfcf",
                          color: "#101820",
                        }}
                      >
                        <FiEdit3 size={20} />
                      </div>

                      <div>
                        <h4 className="fw-bold mb-0">
                          Edit Profile
                        </h4>

                        <small className="text-muted">
                          Update your personal information
                        </small>
                      </div>
                    </div>

                    {message && (
                      <div className="alert alert-success">
                        {message}
                      </div>
                    )}

                    {error && (
                      <div className="alert alert-danger">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        {/* First Name */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold">
                            First Name
                          </label>

                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                          />
                        </div>

                        {/* Last Name */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold">
                            Last Name
                          </label>

                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Email Address
                        </label>

                        <input
                          type="email"
                          value={user.email}
                          disabled
                          className="form-control form-control-lg bg-light"
                        />

                        <small className="text-muted">
                          Email address cannot be changed
                          here.
                        </small>
                      </div>

                      {/* Profile Image */}
                      <div className="mb-4">
                        <label className="form-label fw-semibold">
                          Profile Image URL
                        </label>

                        <input
                          type="text"
                          name="profileImage"
                          value={
                            formData.profileImage
                          }
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Enter image URL"
                        />
                      </div>

                      {/* Save */}
                      <button
                        type="submit"
                        className="btn btn-lg fw-semibold px-4"
                        disabled={loading}
                        style={{
                          backgroundColor: "#c89b5c",
                          color: "#101820",
                        }}
                      >
                        <FiSave className="me-2" />

                        {loading
                          ? "Saving..."
                          : "Save Changes"}
                      </button>
                    </form>
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

export default Profile;