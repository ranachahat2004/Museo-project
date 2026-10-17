import React from "react";
import { Link } from "react-router-dom";
import {
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiMail,
  FiMapPin,
  FiArrowUp
} from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer
      className="text-white"
      style={{
        backgroundColor: "#101820"
      }}
    >
      {/* Main Footer */}
      <div className="container py-5">

        <div className="row g-5">

          {/* Brand */}
          <div className="col-lg-4">

            <Link
              to="/"
              className="text-white text-decoration-none"
            >
              <h3
                className="fw-bold mb-3"
                style={{
                  letterSpacing: "3px"
                }}
              >
                <span
                  className="me-2"
                  style={{
                    color: "#c89b5c"
                  }}
                >
                  ◆
                </span>
                MUSEO
              </h3>
            </Link>

            <p className="text-white-50 lh-lg">
              Where history comes alive. Explore remarkable
              artifacts, discover fascinating stories and
              experience the world's cultural heritage.
            </p>

            {/* Social Icons */}
            <div className="d-flex gap-3 mt-4">

              <a
                href="#"
                className="text-white border border-secondary rounded-circle
                d-flex align-items-center justify-content-center"
                style={{
                  width: "38px",
                  height: "38px"
                }}
              >
                <FiInstagram size={17} />
              </a>

              <a
                href="#"
                className="text-white border border-secondary rounded-circle
                d-flex align-items-center justify-content-center"
                style={{
                  width: "38px",
                  height: "38px"
                }}
              >
                <FiFacebook size={17} />
              </a>

              <a
                href="#"
                className="text-white border border-secondary rounded-circle
                d-flex align-items-center justify-content-center"
                style={{
                  width: "38px",
                  height: "38px"
                }}
              >
                <FiTwitter size={17} />
              </a>

            </div>

          </div>


          {/* Explore */}
          <div className="col-6 col-lg-2">

            <h6
              className="fw-bold mb-4"
              style={{
                color: "#c89b5c"
              }}
            >
              EXPLORE
            </h6>

            <ul className="list-unstyled">

              <li className="mb-3">
                <Link
                  to="/exhibitions"
                  className="text-white-50 text-decoration-none"
                >
                  Exhibitions
                </Link>
              </li>

              <li className="mb-3">
                <Link
                  to="/artifacts"
                  className="text-white-50 text-decoration-none"
                >
                  Artifacts
                </Link>
              </li>

              <li className="mb-3">
                <Link
                  to="/categories"
                  className="text-white-50 text-decoration-none"
                >
                  Categories
                </Link>
              </li>

              <li className="mb-3">
                <Link
                  to="/timeline"
                  className="text-white-50 text-decoration-none"
                >
                  Timeline
                </Link>
              </li>

            </ul>

          </div>


          {/* Information */}
          <div className="col-6 col-lg-2">

            <h6
              className="fw-bold mb-4"
              style={{
                color: "#c89b5c"
              }}
            >
              INFORMATION
            </h6>

            <ul className="list-unstyled">

              <li className="mb-3">
                <Link
                  to="/about"
                  className="text-white-50 text-decoration-none"
                >
                  About Us
                </Link>
              </li>

              <li className="mb-3">
                <Link
                  to="/login"
                  className="text-white-50 text-decoration-none"
                >
                  Login
                </Link>
              </li>

              <li className="mb-3">
                <Link
                  to="/register"
                  className="text-white-50 text-decoration-none"
                >
                  Create Account
                </Link>
              </li>

              <li className="mb-3">
                <a
                  href="#"
                  className="text-white-50 text-decoration-none"
                >
                  Privacy Policy
                </a>
              </li>

            </ul>

          </div>


          {/* Contact */}
          <div className="col-lg-4">

            <h6
              className="fw-bold mb-4"
              style={{
                color: "#c89b5c"
              }}
            >
              GET IN TOUCH
            </h6>

            <div className="d-flex mb-3">

              <FiMapPin
                className="me-3 flex-shrink-0"
                style={{
                  color: "#c89b5c"
                }}
                size={19}
              />

              <span className="text-white-50">
                21 Museum Avenue,
                <br />
                Heritage District
              </span>

            </div>

            <div className="d-flex mb-3">

              <FiMail
                className="me-3"
                style={{
                  color: "#c89b5c"
                }}
                size={19}
              />

              <span className="text-white-50">
                hello@museo.com
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* Bottom Footer */}
      <div
        className="border-top border-secondary"
      >

        <div className="container py-3">

          <div className="d-flex flex-column flex-md-row
          justify-content-between align-items-center gap-3">

            <small className="text-white-50">
              © 2026 MUSEO. All rights reserved.
            </small>

            <small className="text-white-50">
              Where History Comes Alive.
            </small>

            {/* Back To Top */}
            <button
              onClick={scrollToTop}
              className="btn btn-sm text-white d-flex
              align-items-center gap-2"
              style={{
                backgroundColor: "#b78342"
              }}
            >
              Back to top
              <FiArrowUp size={15} />
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;