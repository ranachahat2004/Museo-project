import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f1e8",
      }}
    >
      {/* Hero */}
      <section
        className="py-5"
        style={{
          backgroundColor: "#101820",
        }}
      >
        <div className="container py-5">

          <div className="row align-items-center">

            <div className="col-lg-8">

              <p
                className="text-uppercase fw-semibold mb-3"
                style={{
                  color: "#d7ad7a",
                  letterSpacing:
                    "3px",
                }}
              >
                About MUSEO
              </p>

              <h1
                className="display-3 fw-bold text-white mb-4"
              >
                A Museum Beyond
                Physical Walls
              </h1>

              <p
                className="lead text-light opacity-75"
                style={{
                  maxWidth: "750px",
                  lineHeight: "1.8",
                }}
              >
                MUSEO is an interactive digital
                museum experience designed to
                make history, culture and
                heritage easier to explore
                from anywhere.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* Mission */}
      <section className="py-5">

        <div className="container">

          <div className="row g-5 align-items-center">

            <div className="col-lg-6">

              <p
                className="text-uppercase fw-semibold mb-2"
                style={{
                  color: "#b78342",
                  letterSpacing:
                    "2px",
                }}
              >
                Our Mission
              </p>

              <h2
                className="fw-bold mb-4"
                style={{
                  color: "#101820",
                }}
              >
                Making Heritage
                Accessible
              </h2>

              <p
                className="text-secondary"
                style={{
                  lineHeight: "1.9",
                }}
              >
                MUSEO brings exhibitions,
                artifacts and historical
                stories together in one
                digital environment. Our goal
                is to create an engaging way
                for visitors to discover and
                understand cultural heritage.
              </p>

              <p
                className="text-secondary"
                style={{
                  lineHeight: "1.9",
                }}
              >
                Instead of simply viewing a
                collection, users can explore
                exhibitions, examine artifacts,
                follow historical timelines and
                create their own personal
                collections.
              </p>

            </div>

            <div className="col-lg-6">

              <div
                className="p-5"
                style={{
                  backgroundColor:
                    "#e9dfcf",
                  borderLeft:
                    "5px solid #b78342",
                }}
              >
                <h4
                  className="fw-bold mb-3"
                  style={{
                    color: "#101820",
                  }}
                >
                  Discover. Learn.
                  Remember.
                </h4>

                <p
                  className="mb-0 text-secondary"
                  style={{
                    lineHeight: "1.8",
                  }}
                >
                  Every artifact carries a
                  story. MUSEO helps bring those
                  stories closer to the people
                  who want to discover them.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}
      <section
        className="py-5"
        style={{
          backgroundColor: "#ffffff",
        }}
      >
        <div className="container">

          <div className="text-center mb-5">

            <p
              className="text-uppercase fw-semibold mb-2"
              style={{
                color: "#b78342",
                letterSpacing:
                  "2px",
              }}
            >
              What MUSEO Offers
            </p>

            <h2
              className="fw-bold"
              style={{
                color: "#101820",
              }}
            >
              Explore History Your Way
            </h2>

          </div>

          <div className="row g-4">

            <div className="col-lg-4 col-md-6">
              <div className="p-4 h-100 border">

                <div
                  className="fs-2 mb-3"
                  style={{
                    color: "#b78342",
                  }}
                >
                  ◇
                </div>

                <h5 className="fw-bold">
                  Digital Exhibitions
                </h5>

                <p className="text-muted mb-0">
                  Explore curated exhibitions
                  and discover the stories behind
                  important collections.
                </p>

              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="p-4 h-100 border">

                <div
                  className="fs-2 mb-3"
                  style={{
                    color: "#b78342",
                  }}
                >
                  ◇
                </div>

                <h5 className="fw-bold">
                  Artifact Discovery
                </h5>

                <p className="text-muted mb-0">
                  Learn about artifacts through
                  descriptions, images, periods,
                  origins and materials.
                </p>

              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="p-4 h-100 border">

                <div
                  className="fs-2 mb-3"
                  style={{
                    color: "#b78342",
                  }}
                >
                  ◇
                </div>

                <h5 className="fw-bold">
                  Historical Timeline
                </h5>

                <p className="text-muted mb-0">
                  Travel through important
                  historical periods and events
                  using an interactive timeline.
                </p>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-5">
        <div className="container">

          <div
            className="text-center p-5"
            style={{
              backgroundColor:
                "#101820",
            }}
          >

            <h2 className="fw-bold text-white mb-3">
              Start Your Museum Journey
            </h2>

            <p className="text-light opacity-75 mb-4">
              Discover exhibitions, artifacts
              and stories waiting to be explored.
            </p>

            <button
              className="btn px-4 py-2"
              style={{
                backgroundColor:
                  "#b78342",
                color: "#fff",
                borderRadius: "0",
              }}
              onClick={() =>
                navigate(
                  "/exhibitions"
                )
              }
            >
              Explore Exhibitions
            </button>

          </div>

        </div>
      </section>

    </div>
  );
};

export default About;