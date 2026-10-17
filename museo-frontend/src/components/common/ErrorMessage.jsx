import React from "react";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

const ErrorMessage = ({
  message = "Something went wrong. Please try again.",
  onRetry
}) => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">

          <div className="card border-0 shadow-sm text-center">
            <div className="card-body p-5">

              {/* Error Icon */}
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                style={{
                  width: "65px",
                  height: "65px",
                  backgroundColor: "#f8e8e6"
                }}
              >
                <FiAlertCircle
                  size={30}
                  color="#b44b3e"
                />
              </div>

              {/* Heading */}
              <h4
                className="fw-bold mb-3"
                style={{
                  fontFamily: "Georgia, serif"
                }}
              >
                Something Went Wrong
              </h4>

              {/* Message */}
              <p className="text-secondary mb-4">
                {message}
              </p>

              {/* Retry Button */}
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="btn text-white px-4"
                  style={{
                    backgroundColor: "#b78342"
                  }}
                >
                  <FiRefreshCw
                    className="me-2"
                    size={16}
                  />
                  Try Again
                </button>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;