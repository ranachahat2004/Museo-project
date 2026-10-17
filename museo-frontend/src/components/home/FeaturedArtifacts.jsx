import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getFeaturedArtifacts,
} from "../../services/artifactService";

import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";

const FeaturedArtifacts = () => {
  const navigate = useNavigate();

  const [artifacts, setArtifacts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchFeaturedArtifacts =
    async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getFeaturedArtifacts();

        setArtifacts(
          response.artifacts || []
        );
      } catch (error) {
        console.error(
          "Featured Artifacts Error:",
          error
        );

        setError(
          "Unable to load featured artifacts."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchFeaturedArtifacts();
  }, []);

  return (
    <section
      className="py-5"
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-5">

          <p
            className="text-uppercase fw-semibold mb-2"
            style={{
              color: "#b78342",
              letterSpacing:
                "3px",
              fontSize: "0.8rem",
            }}
          >
            Museum Treasures
          </p>

          <h2
            className="fw-bold mb-3"
            style={{
              color: "#101820",
              fontSize:
                "clamp(2rem, 4vw, 3rem)",
            }}
          >
            Featured Artifacts
          </h2>

          <p
            className="text-muted mx-auto"
            style={{
              maxWidth: "650px",
              lineHeight: "1.8",
            }}
          >
            Take a closer look at remarkable
            objects that preserve the stories
            of civilizations and cultures.
          </p>

        </div>

        {/* Loading */}
        {loading && <Loading />}

        {/* Error */}
        {!loading && error && (
          <ErrorMessage
            message={error}
          />
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          artifacts.length === 0 && (
            <div className="text-center py-5">

              <div
                className="display-5 mb-3"
                style={{
                  color: "#b78342",
                }}
              >
                ◇
              </div>

              <h5
                className="fw-bold"
                style={{
                  color: "#101820",
                }}
              >
                No Featured Artifacts
              </h5>

              <p className="text-muted">
                Featured artifacts will
                appear here soon.
              </p>

            </div>
          )}

        {/* Cards */}
        {!loading &&
          !error &&
          artifacts.length > 0 && (
            <div className="row g-4">

              {artifacts
                .slice(0, 3)
                .map((artifact) => (
                  <div
                    className="col-lg-4 col-md-6"
                    key={
                      artifact._id
                    }
                  >
                    <div
                      className="card h-100 border-0 shadow-sm"
                      style={{
                        cursor: "pointer",
                        overflow: "hidden",
                      }}
                      onClick={() =>
                        navigate(
                          `/artifacts/${artifact._id}`
                        )
                      }
                    >

                      <div
                        style={{
                          height:
                            "260px",
                          overflow:
                            "hidden",
                          backgroundColor:
                            "#e9dfcf",
                        }}
                      >
                        <img
                          src={
                            artifact.image ||
                            "https://via.placeholder.com/600x400?text=MUSEO+Artifact"
                          }
                          alt={
                            artifact.title
                          }
                          className="w-100 h-100"
                          style={{
                            objectFit:
                              "cover",
                          }}
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/600x400?text=MUSEO+Artifact";
                          }}
                        />
                      </div>

                      <div className="card-body p-4">

                        {artifact.category
                          ?.name && (
                          <small
                            className="text-uppercase fw-semibold"
                            style={{
                              color:
                                "#b78342",
                              letterSpacing:
                                "1px",
                            }}
                          >
                            {
                              artifact
                                .category
                                .name
                            }
                          </small>
                        )}

                        <h5
                          className="fw-bold mt-2 mb-2"
                          style={{
                            color:
                              "#101820",
                          }}
                        >
                          {
                            artifact.title
                          }
                        </h5>

                        <p
                          className="text-muted mb-3"
                          style={{
                            lineHeight:
                              "1.7",
                          }}
                        >
                          {artifact.shortDescription ||
                            artifact.description?.slice(
                              0,
                              110
                            )}
                          {artifact.description
                            ?.length >
                            110 &&
                            "..."}
                        </p>

                        <span
                          className="fw-semibold"
                          style={{
                            color:
                              "#b78342",
                          }}
                        >
                          Explore Artifact →
                        </span>

                      </div>

                    </div>
                  </div>
                ))}

            </div>
          )}

        {/* View All */}
        {!loading &&
          !error &&
          artifacts.length > 0 && (
            <div className="text-center mt-5">

              <button
                className="btn px-4 py-2"
                style={{
                  border:
                    "1px solid #b78342",
                  color: "#b78342",
                  borderRadius: "0",
                }}
                onClick={() =>
                  navigate(
                    "/artifacts"
                  )
                }
              >
                View All Artifacts
              </button>

            </div>
          )}

      </div>
    </section>
  );
};

export default FeaturedArtifacts;