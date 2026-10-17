import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      <section
        className="position-relative overflow-hidden text-white"
        style={{
          height: "calc(100vh - 70px)",
          minHeight: "650px",
          backgroundColor: "#111",
        }}
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            objectFit: "cover",
            zIndex: 0,
            animation: "museoZoom 14s ease-in-out infinite alternate",
          }}
        >
          <source
            src="/videos/artifacts .mp4"
            type="video/mp4"
          />

          Your browser does not support video.
        </video>

        {/* Dark Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            zIndex: 1,
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.70) 40%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.55) 100%)",
          }}
        ></div>

        {/* Hero Content */}
        <div
          className="container position-relative h-100"
          style={{
            zIndex: 3,
          }}
        >
          <div className="row h-100 align-items-center">
            <div className="col-lg-8 col-xl-7">

              {/* Small Label */}
              <div
                className="d-flex align-items-center gap-2 text-uppercase fw-semibold mb-4"
                style={{
                  color: "#d7ad7a",
                  fontSize: "0.75rem",
                  letterSpacing: "4px",
                  animation: "museoFadeDown 1s ease forwards",
                }}
              >
                <span
                  style={{
                    width: "35px",
                    height: "1px",
                    backgroundColor: "#d7ad7a",
                  }}
                ></span>

                Digital Museum Experience

                <span
                  style={{
                    width: "35px",
                    height: "1px",
                    backgroundColor: "#d7ad7a",
                  }}
                ></span>
              </div>

              {/* Main Heading */}
              <h1
                className="display-1 fw-normal lh-1 mb-4"
                style={{
                  fontFamily:
                    'Georgia, "Times New Roman", serif',
                  letterSpacing: "-4px",
                  animation:
                    "museoTitleReveal 1.2s cubic-bezier(.16,1,.3,1) forwards",
                }}
              >
                Discover
                <br />

                <span
                  style={{
                    color: "#d7ad7a",
                    fontStyle: "italic",
                  }}
                >
                  Stories of
                </span>

                <br />

                the Past.
              </h1>

              {/* Description */}
              <p
                className="lead mb-4"
                style={{
                  maxWidth: "600px",
                  color: "rgba(255,255,255,0.78)",
                  lineHeight: "1.8",
                  fontSize: "1.05rem",
                  animation: "museoFadeUp 1s ease 0.35s both",
                }}
              >
                Explore remarkable artifacts,
                extraordinary exhibitions and
                centuries of human history through
                an immersive digital museum experience.
              </p>

              {/* Buttons */}
              <div
                className="d-flex flex-wrap gap-3 mt-4"
                style={{
                  animation: "museoFadeUp 1s ease 0.5s both",
                }}
              >
                <Link
                  to="/artifacts"
                  className="btn btn-lg px-4 py-3 rounded-0 fw-semibold"
                  style={{
                    backgroundColor: "#d7ad7a",
                    borderColor: "#d7ad7a",
                    color: "#111",
                  }}
                >
                  Explore Artifacts
                  <span className="ms-2">→</span>
                </Link>

                <Link
                  to="/exhibitions"
                  className="btn btn-lg px-4 py-3 rounded-0"
                  style={{
                    color: "#fff",
                    border:
                      "1px solid rgba(255,255,255,0.7)",
                    backgroundColor:
                      "rgba(255,255,255,0.05)",
                  }}
                >
                  View Exhibitions
                </Link>
              </div>

              {/* Statistics */}
              <div
                className="d-flex flex-wrap align-items-center gap-4 mt-5"
                style={{
                  animation: "museoFadeUp 1s ease 0.7s both",
                }}
              >
                {/* Stat 1 */}
                <div>
                  <div className="fs-3 fw-semibold">
                    500+
                  </div>

                  <small
                    className="text-uppercase"
                    style={{
                      color:
                        "rgba(255,255,255,0.55)",
                      letterSpacing: "1.5px",
                    }}
                  >
                    Artifacts
                  </small>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: "40px",
                    width: "1px",
                    backgroundColor:
                      "rgba(255,255,255,0.3)",
                  }}
                ></div>

                {/* Stat 2 */}
                <div>
                  <div className="fs-3 fw-semibold">
                    50+
                  </div>

                  <small
                    className="text-uppercase"
                    style={{
                      color:
                        "rgba(255,255,255,0.55)",
                      letterSpacing: "1.5px",
                    }}
                  >
                    Exhibitions
                  </small>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: "40px",
                    width: "1px",
                    backgroundColor:
                      "rgba(255,255,255,0.3)",
                  }}
                ></div>

                {/* Stat 3 */}
                <div>
                  <div className="fs-3 fw-semibold">
                    1000+
                  </div>

                  <small
                    className="text-uppercase"
                    style={{
                      color:
                        "rgba(255,255,255,0.55)",
                      letterSpacing: "1.5px",
                    }}
                  >
                    Years of History
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            className="position-absolute bottom-0 end-0 mb-4 d-none d-lg-flex align-items-center gap-3"
            style={{
              transform:
                "rotate(90deg) translateX(100%)",
              transformOrigin: "right bottom",
              color:
                "rgba(255,255,255,0.65)",
              fontSize: "0.65rem",
              letterSpacing: "3px",
            }}
          >
            <div
              style={{
                width: "55px",
                height: "1px",
                backgroundColor:
                  "rgba(255,255,255,0.65)",
              }}
            ></div>

            SCROLL TO EXPLORE
          </div>
        </div>

        {/* Animated Golden Glow */}
        <div
          className="position-absolute rounded-circle"
          style={{
            width: "500px",
            height: "500px",
            left: "-250px",
            top: "30%",
            zIndex: 2,
            pointerEvents: "none",
            background:
              "radial-gradient(circle, rgba(166,124,82,0.18), transparent 70%)",
            animation:
              "museoGlow 8s ease-in-out infinite alternate",
          }}
        ></div>

        {/* Animation Styles */}
        <style>
          {`
            @keyframes museoZoom {
              0% {
                transform: scale(1);
              }

              100% {
                transform: scale(1.08);
              }
            }

            @keyframes museoTitleReveal {
              from {
                opacity: 0;
                transform: translateY(60px);
                filter: blur(8px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
                filter: blur(0);
              }
            }

            @keyframes museoFadeUp {
              from {
                opacity: 0;
                transform: translateY(25px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes museoFadeDown {
              from {
                opacity: 0;
                transform: translateY(-20px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes museoGlow {
              0% {
                transform: translateY(-20px);
              }

              100% {
                transform: translateY(40px);
              }
            }

            @media (max-width: 991px) {
              .museo-hero-title {
                font-size: 5rem !important;
              }
            }

            @media (max-width: 575px) {
              .museo-hero-title {
                font-size: 3.5rem !important;
                letter-spacing: -2px !important;
              }
            }
          `}
        </style>
      </section>
    </>
  );
};

export default HeroSection;