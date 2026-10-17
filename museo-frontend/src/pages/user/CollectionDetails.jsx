import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import {
  getCollectionById,
  removeArtifactFromCollection,
} from "../../services/collectionService";

import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

const CollectionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useAuth();

  const [collection, setCollection] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");

  const fetchCollection = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getCollectionById(token, id);

      setCollection(response.collection);
    } catch (error) {
      console.error(
        "Collection Details Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load collection."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && id) {
      fetchCollection();
    }
  }, [token, id]);

  const handleRemoveArtifact = async (
    artifactId
  ) => {
    const confirmRemove = window.confirm(
      "Remove this artifact from the collection?"
    );

    if (!confirmRemove) return;

    try {
      const response =
        await removeArtifactFromCollection(
          token,
          id,
          artifactId
        );

      setCollection(response.collection);
    } catch (error) {
      console.error(
        "Remove Artifact Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to remove artifact."
      );
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div
        className="container py-5"
        style={{
          backgroundColor: "#f5f1e8",
          minHeight: "80vh",
        }}
      >
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!collection) {
    return null;
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
          <button
            className="btn btn-link text-decoration-none p-0 mb-4"
            style={{
              color: "#d7ad7a",
            }}
            onClick={() =>
              navigate("/collections")
            }
          >
            <FaArrowLeft className="me-2" />
            Back to Collections
          </button>

          <h1 className="fw-bold">
            {collection.name}
          </h1>

          <p
            className="mb-2"
            style={{
              color: "#d8d0c5",
              maxWidth: "700px",
            }}
          >
            {collection.description ||
              "Your personal museum collection."}
          </p>

          <span
            className="badge rounded-pill"
            style={{
              backgroundColor: "#b78342",
            }}
          >
            {collection.artifacts?.length || 0}{" "}
            Artifacts
          </span>
        </div>
      </div>

      {/* ARTIFACTS */}

      <div className="container py-5">
        {collection.artifacts?.length === 0 ? (
          <div
            className="text-center py-5 rounded-4"
            style={{
              backgroundColor: "#fff",
            }}
          >
            <h4
              className="fw-bold"
              style={{ color: "#101820" }}
            >
              This collection is empty
            </h4>

            <p className="text-muted">
              Explore artifacts and add your
              favorites to this collection.
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
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {collection.artifacts.map(
              (artifact) => (
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
                      <h5
                        className="fw-bold"
                        style={{
                          color: "#101820",
                        }}
                      >
                        {artifact.title}
                      </h5>

                      <p className="text-muted small">
                        {artifact.description ||
                          "Museum artifact"}
                      </p>

                      {artifact.period && (
                        <p className="small mb-2">
                          <strong>
                            Period:
                          </strong>{" "}
                          {artifact.period}
                        </p>
                      )}

                      <div className="d-flex gap-2 mt-3">
                        <button
                          className="btn btn-sm text-white flex-grow-1"
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
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="Remove"
                          onClick={() =>
                            handleRemoveArtifact(
                              artifact._id
                            )
                          }
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionDetails;