import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiEye,
  FiEyeOff,
  FiUserPlus,
} from "react-icons/fi";

import { registerUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = formData;

    // Check empty fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }

    // Check password length
    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    // Check password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser({
        firstName,
        lastName,
        email,
        password,
      });

      /*
        AuthContext will:
        1. Save token
        2. Save user
        3. Update React authentication state
      */
      login(response);

      alert("Registration successful!");

      navigate("/");
    } catch (error) {
      console.error(
        "Registration Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{
        backgroundColor: "#f5f1e8",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7 col-sm-10">

            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "18px",
                overflow: "hidden",
              }}
            >

              {/* Header */}
              <div
                className="text-center p-4"
                style={{
                  backgroundColor: "#101820",
                  color: "white",
                }}
              >
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "65px",
                    height: "65px",
                    backgroundColor: "#b78342",
                    fontSize: "28px",
                  }}
                >
                  <FiUserPlus />
                </div>

                <h2
                  className="fw-bold mb-1"
                  style={{
                    color: "#d7ad7a",
                  }}
                >
                  Join MUSEO
                </h2>

                <p className="mb-0 text-light">
                  Create your museum account
                </p>
              </div>

              {/* Form */}
              <div className="card-body p-4 p-md-5">

                {/* Error */}
                {error && (
                  <div
                    className="alert alert-danger"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  {/* First + Last Name */}
                  <div className="row">

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        First Name
                      </label>

                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter first name"
                        disabled={loading}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Last Name
                      </label>

                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter last name"
                        disabled={loading}
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
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter email address"
                      disabled={loading}
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <div className="input-group">
                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter password"
                        disabled={loading}
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                        disabled={loading}
                      >
                        {showPassword ? (
                          <FiEyeOff />
                        ) : (
                          <FiEye />
                        )}
                      </button>
                    </div>

                    <small className="text-muted">
                      Password must contain at least
                      6 characters.
                    </small>
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Confirm Password
                    </label>

                    <div className="input-group">
                      <input
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        name="confirmPassword"
                        value={
                          formData.confirmPassword
                        }
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Confirm your password"
                        disabled={loading}
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                        disabled={loading}
                      >
                        {showConfirmPassword ? (
                          <FiEyeOff />
                        ) : (
                          <FiEye />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Register Button */}
                  <button
                    type="submit"
                    className="btn w-100 py-2 fw-semibold"
                    disabled={loading}
                    style={{
                      backgroundColor: "#b78342",
                      color: "white",
                      border: "none",
                    }}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>

                        Creating Account...
                      </>
                    ) : (
                      <>
                        <FiUserPlus className="me-2" />
                        Create Account
                      </>
                    )}
                  </button>
                </form>

                {/* Login Link */}
                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    Already have an account?
                  </p>

                  <Link
                    to="/login"
                    className="fw-semibold"
                    style={{
                      color: "#b78342",
                    }}
                  >
                    Login to MUSEO
                  </Link>
                </div>

              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-3">
              <Link
                to="/"
                className="text-muted"
              >
                ← Back to Home
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;