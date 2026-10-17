import React from "react";
import { FiArchive } from "react-icons/fi";

const EmptyState = ({
  title = "Nothing Found",
  message = "There is nothing to display here.",
  buttonText,
  onButtonClick
}) => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">

          <div className="text-center py-5">

            {/* Icon */}
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
              style={{
                width: "75px",
                height: "75px",
                backgroundColor: "#e9dfcf"
              }}
            >
              <FiArchive
                size={32}
                style={{
                  color: "#b78342"
                }}
              />
            </div>

            {/* Title */}
            <h4
              className="fw-bold mb-3"
              style={{
                fontFamily: "Georgia, serif"
              }}
            >
              {title}
            </h4>

            {/* Message */}
            <p className="text-secondary mb-4">
              {message}
            </p>

            {/* Optional Button */}
            {buttonText && (
              <button
                onClick={onButtonClick}
                className="btn text-white px-4"
                style={{
                  backgroundColor: "#b78342"
                }}
              >
                {buttonText}
              </button>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default EmptyState;