import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import {
  getFavoriteArtifacts,
} from "../../services/favoriteService";

import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

const Favorites = () => {
  const navigate = useNavigate();

  const { token } = useAuth();

  const [favorites, setFavorites] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getFavoriteArtifacts(token);

      setFavorites(response.favorites || []);
    } catch (error) {
      console.error(
        "Favorites Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load favorites."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFavorites();
    }
  }, [token]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      style={{
        backgroundColor: "#f5f1e8",
        minHeight: "100vh",
        paddingBottom: "80px",
      }}
    >
      {/* HEADER */}

      <div
        className="py-5"
        style={{
          backgroundColor: "#17120e",
          color: "#fff",
        }}
      >
        <div className="container">
          <p
            className="mb-2"
            style={{
              color: "#d7ad7a",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontSize: "13px",
            }}
          >
            Your Personal Space
          </p>

          <h1 className="fw-bold mb-2">
            My Favorites
          </h1>

          <p
            className="mb-0"
            style={{ color: "#d8d0c5" }}
          >
            Artifacts you have saved for
            later exploration.
          </p>
        </div>
      </div>

      <div className="container py-5">
        {error && (
          <ErrorMessage message={error} />
        )}

        {!error &&
          favorites.length === 0 && (
            <div
              className="text-center py-5 rounded-4"
              style={{
                backgroundColor: "#fff",
              }}
            >
              <FaHeart
                size={50}
                style={{
                  color: "#b78342",
                }}
              />

              <h4
                className="fw-bold mt-3"
                style={{
                  color: "#101820",
                }}
              >
                No Favorites Yet
              </h4>

              <p className="text-muted">
                Start exploring artifacts and
                save the ones you love.
              </p>

              <button
                className="btn text-white"
                style={{
                  backgroundColor: "#b78342",
                }}
                onClick={() =>
                  navigate("/artifacts")
                }
              >
                Explore Artifacts
                <FaArrowRight className="ms-2" />
              </button>
            </div>
          )}

        {!error &&
          favorites.length > 0 && (
            <>
              <div className="mb-4">
                <h4
                  className="fw-bold"
                  style={{
                    color: "#101820",
                  }}
                >
                  Saved Artifacts
                </h4>

                <p className="text-muted">
                  {favorites.length} saved
                  artifact
                  {favorites.length !== 1
                    ? "s"
                    : ""}
                </p>
              </div>

              <div className="row g-4">
                {favorites.map((artifact) => (
                  <div
                    className="col-md-6 col-lg-4"
                    key={artifact._id}
                  >
                    <div
                      className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden"
                      style={{
                        backgroundColor: "#fff",
                      }}
                    >
                      <div
                        style={{
                          height: "250px",
                          backgroundColor:
                            "#e9dfcf",
                        }}
                      >
                        {artifact.image ? (
                          <img
                            src={artifact.image}
                            alt={artifact.title}
                            className="w-100 h-100"
                            style={{
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div className="h-100 d-flex align-items-center justify-content-center">
                            <span className="text-muted">
                              No Image
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-start gap-2">
                          <h5
                            className="fw-bold"
                            style={{
                              color:
                                "#101820",
                            }}
                          >
                            {artifact.title}
                          </h5>

                          <FaHeart
                            style={{
                              color:
                                "#b78342",
                              flexShrink: 0,
                            }}
                          />
                        </div>

                        <p className="text-muted small">
                          {artifact.shortDescription ||
                            artifact.description ||
                            "Museum artifact"}
                        </p>

                        {artifact.period && (
                          <p className="small">
                            <strong>
                              Period:
                            </strong>{" "}
                            {artifact.period}
                          </p>
                        )}

                        <button
                          className="btn btn-sm text-white w-100 mt-2"
                          style={{
                            backgroundColor:
                              "#b78342",
                          }}
                          onClick={() =>
                            navigate(
                              `/artifacts/${artifact._id}`
                            )
                          }
                        >
                          View Artifact
                          <FaArrowRight className="ms-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default Favorites;