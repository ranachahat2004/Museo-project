import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  if (!formData.email || !formData.password) {
    setError("Please enter email and password.");
    return;
  }

  try {
    setLoading(true);

    // Call backend login API
    const response = await loginUser({
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    });

    // Check backend response
    if (!response.token || !response.user) {
      setError("Invalid login response from server.");
      return;
    }

    // Save token and user in React AuthContext
    // This also updates the authentication state.
    login(response);

    // Save remember-me preference
    localStorage.setItem(
      "museoRememberMe",
      String(rememberMe)
    );

    // Redirect according to the actual role from backend
    if (response.user.role === "admin") {
      navigate("/admin", { replace: true });
    } else if (response.user.role === "user") {
      navigate("/dashboard", { replace: true });
    } else {
      setError("Your account does not have a valid role.");
    }
  } catch (error) {
    console.error("Login Error:", error);

    setError(
      error.response?.data?.message ||
        "Login failed. Please check your email and password."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      className="min-vh-100 d-flex align-items-center py-5"
      style={{
        backgroundColor: "#f5f1e8",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <div
              className="card border-0 shadow-lg rounded-4 overflow-hidden"
              style={{
                backgroundColor: "#ffffff",
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
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                  style={{
                    width: "65px",
                    height: "65px",
                    backgroundColor: "#c89b5c",
                  }}
                >
                  <FiLogIn
                    size={28}
                    color="#101820"
                  />
                </div>

                <h2 className="fw-bold mb-1">
                  Welcome Back
                </h2>

                <p className="mb-0 opacity-75">
                  Continue exploring MUSEO
                </p>
              </div>

              {/* Form */}
              <div className="card-body p-4 p-md-5">
                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
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
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
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
                        className="form-control form-control-lg"
                        placeholder="Enter your password"
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                      >
                        {showPassword ? (
                          <FiEyeOff />
                        ) : (
                          <FiEye />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember / Forgot */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) =>
                          setRememberMe(
                            e.target.checked
                          )
                        }
                      />

                      {/* <label
                        htmlFor="rememberMe"
                        className="form-check-label"
                      >
                        Remember me
                      </label> */}
                    </div>

                    {/* <button
                      type="button"
                      className="btn btn-link p-0 text-decoration-none"
                      style={{
                        color: "#b78342",
                      }}
                      onClick={() =>
                        alert(
                          "Password reset feature will be added later."
                        )
                      }
                    >
                      Forgot Password?
                    </button> */}
                  </div>

                  {/* Login */}
                  <button
                    type="submit"
                    className="btn btn-lg w-100 fw-semibold"
                    disabled={loading}
                    style={{
                      backgroundColor: "#c89b5c",
                      color: "#101820",
                    }}
                  >
                    {loading
                      ? "Logging in..."
                      : "Login"}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <span className="text-muted">
                    Don't have an account?{" "}
                  </span>

                  <Link
                    to="/register"
                    className="fw-semibold"
                    style={{
                      color: "#b78342",
                    }}
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;