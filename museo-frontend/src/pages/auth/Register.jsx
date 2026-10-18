import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FiEye,
  FiEyeOff,
  FiUserPlus,
  FiMail,
  FiCheckCircle,
} from "react-icons/fi";

import { registerUser } from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // Validate form
  const validateForm = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = formData;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      return "Please fill in all fields.";
    }

    // Validate names
    const nameRegex = /^[a-zA-Z\s'-]+$/;

    if (!nameRegex.test(firstName.trim())) {
      return "Please enter a valid first name.";
    }

    if (!nameRegex.test(lastName.trim())) {
      return "Please enter a valid last name.";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address.";
    }

    // Password must contain uppercase, lowercase,
    // number, special character and minimum 8 characters.
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return (
        "Password must contain at least 8 characters, " +
        "one uppercase letter, one lowercase letter, " +
        "one number, and one special character."
      );
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return null;
  };

  // Submit registration form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      // Do not log the user in before email verification.
      // The backend should send the verification email.
      setSuccess(
        response.message ||
          "Registration successful! Please check your email to verify your account."
      );

      // Clear sensitive form fields
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Registration Error:", error);

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

              {/* Form Body */}
              <div className="card-body p-4 p-md-5">
                {/* Error Message */}
                {error && (
                  <div
                    className="alert alert-danger"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div
                    className="alert alert-success"
                    role="alert"
                  >
                    <div className="d-flex align-items-start">
                      <FiCheckCircle
                        size={22}
                        className="me-2 mt-1 flex-shrink-0"
                      />

                      <div>
                        <strong>Registration Successful!</strong>

                        <p className="mb-2 mt-1">
                          {success}
                        </p>

                        <p className="mb-2">
                          Please check your inbox and spam folder
                          for the verification email.
                        </p>

                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                          onClick={() => navigate("/login")}
                        >
                          Continue to Login
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  {/* First Name and Last Name */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="firstName"
                        className="form-label fw-semibold"
                      >
                        First Name
                      </label>

                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter first name"
                        autoComplete="given-name"
                        maxLength={50}
                        disabled={loading || !!success}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="lastName"
                        className="form-label fw-semibold"
                      >
                        Last Name
                      </label>

                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter last name"
                        autoComplete="family-name"
                        maxLength={50}
                        disabled={loading || !!success}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="form-label fw-semibold"
                    >
                      Email Address
                    </label>

                    <div className="input-group">
                      <span className="input-group-text">
                        <FiMail />
                      </span>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter email address"
                        autoComplete="email"
                        maxLength={254}
                        disabled={loading || !!success}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold"
                    >
                      Password
                    </label>

                    <div className="input-group">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Create a strong password"
                        autoComplete="new-password"
                        disabled={loading || !!success}
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        onClick={() =>
                          setShowPassword((previous) => !previous)
                        }
                        disabled={loading || !!success}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>

                    <small className="text-muted">
                      Minimum 8 characters, including uppercase,
                      lowercase, a number and a special character.
                    </small>
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="form-label fw-semibold"
                    >
                      Confirm Password
                    </label>

                    <div className="input-group">
                      <input
                        id="confirmPassword"
                        type={
                          showConfirmPassword ? "text" : "password"
                        }
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        disabled={loading || !!success}
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                        onClick={() =>
                          setShowConfirmPassword(
                            (previous) => !previous
                          )
                        }
                        disabled={loading || !!success}
                      >
                        {showConfirmPassword ? (
                          <FiEyeOff />
                        ) : (
                          <FiEye />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit */}
                  {!success && (
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
                            aria-hidden="true"
                          />

                          Creating Account...
                        </>
                      ) : (
                        <>
                          <FiUserPlus className="me-2" />
                          Create Account
                        </>
                      )}
                    </button>
                  )}
                </form>

                {/* Login Link */}
                {!success && (
                  <div className="text-center mt-4">
                    <p className="text-muted mb-1">
                      Already have an account?
                    </p>

                    <Link
                      to="/login"
                      className="fw-semibold text-decoration-none"
                      style={{
                        color: "#b78342",
                      }}
                    >
                      Login to MUSEO
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-3">
              <Link
                to="/"
                className="text-muted text-decoration-none"
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