import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

import { verifyEmail } from "../../services/authService";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(
    "Please wait while we verify your email address..."
  );

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing.");
      return;
    }

    let cancelled = false;

    const verify = async () => {
      try {
        const response = await verifyEmail(token);

        if (cancelled) return;

        setStatus("success");
        setMessage(
          response.message ||
            "Your email has been verified successfully."
        );
      } catch (error) {
        if (cancelled) return;

        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "Email verification failed. Please try again."
        );
      }
    };

    verify();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3"
      style={{ backgroundColor: "#f5f1e8" }}
    >
      <div
        className="card border-0 shadow-lg text-center p-4 p-md-5"
        style={{
          maxWidth: "500px",
          width: "100%",
          borderRadius: "18px",
        }}
      >
        {status === "loading" && (
          <>
            <div
              className="spinner-border mx-auto mb-4"
              style={{ color: "#b78342" }}
              role="status"
            >
              <span className="visually-hidden">
                Loading...
              </span>
            </div>

            <h2 className="fw-bold">Verifying Email</h2>
          </>
        )}

        {status === "success" && (
          <>
            <FiCheckCircle
              size={64}
              className="mx-auto mb-3"
              color="#198754"
            />

            <h2 className="fw-bold">
              Email Verified!
            </h2>
          </>
        )}

        {status === "error" && (
          <>
            <FiAlertCircle
              size={64}
              className="mx-auto mb-3"
              color="#dc3545"
            />

            <h2 className="fw-bold">
              Verification Failed
            </h2>
          </>
        )}

        <p className="text-muted mt-3">
          {message}
        </p>

        {status !== "loading" && (
          <Link
            to="/login"
            className="btn mt-3 py-2 fw-semibold"
            style={{
              backgroundColor: "#b78342",
              color: "#fff",
              border: "none",
            }}
          >
            Continue to Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;