import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const PageHeader = ({
  eyebrow,
  title,
  description,
  showBackButton = false
}) => {
  return (
    <section
      className="py-5"
      style={{
        backgroundColor: "#101820"
      }}
    >
      <div className="container">

        <div className="row">
          <div className="col-lg-8">

            {/* Back Button */}
            {showBackButton && (
              <Link
                to="/"
                className="text-white-50 text-decoration-none d-inline-flex align-items-center mb-4"
              >
                <FiArrowLeft className="me-2" />
                Back
              </Link>
            )}

            {/* Eyebrow */}
            {eyebrow && (
              <p
                className="text-uppercase fw-semibold mb-2"
                style={{
                  color: "#c89b5c",
                  letterSpacing: "3px",
                  fontSize: "13px"
                }}
              >
                {eyebrow}
              </p>
            )}

            {/* Title */}
            <h1
              className="display-5 fw-bold text-white mb-3"
              style={{
                fontFamily: "Georgia, serif"
              }}
            >
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p
                className="text-white-50 lead mb-0"
                style={{
                  maxWidth: "700px"
                }}
              >
                {description}
              </p>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};

export default PageHeader;