import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FaHeart,
  FaRegHeart,
  FaArrowLeft,
  FaFolderPlus,
  FaVolumeUp,
  FaPause,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import {
  getArtifactById,
} from "../../services/artifactService";

import {
  getFavoriteArtifacts,
  addFavorite,
  removeFavorite,
} from "../../services/favoriteService";

import {
  getMyCollections,
  addArtifactToCollection,
} from "../../services/collectionService";

import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

const ArtifactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    token,
    isAuthenticated,
  } = useAuth();

  const [artifact, setArtifact] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [isFavorite, setIsFavorite] =
    useState(false);

  const [favoriteLoading, setFavoriteLoading] =
    useState(false);

  const [collections, setCollections] =
    useState([]);

  const [showCollectionModal, setShowCollectionModal] =
    useState(false);

  const [selectedCollection, setSelectedCollection] =
    useState("");

  const [audioPlaying, setAudioPlaying] =
    useState(false);

  /* =========================
     FETCH ARTIFACT
  ========================= */

  const fetchArtifact = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getArtifactById(id);

      setArtifact(response.artifact);
    } catch (error) {
      console.error(
        "Artifact Details Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load artifact."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     CHECK FAVORITE
  ========================= */

  const checkFavorite = async () => {
    try {
      if (!token || !id) return;

      const response =
        await getFavoriteArtifacts(token);

      const favorites =
        response.favorites || [];

      const exists = favorites.some(
        (favorite) =>
          favorite._id === id
      );

      setIsFavorite(exists);
    } catch (error) {
      console.error(
        "Check Favorite Error:",
        error
      );
    }
  };

  /* =========================
     FETCH COLLECTIONS
  ========================= */

  const fetchCollections = async () => {
    try {
      if (!token) return;

      const response =
        await getMyCollections(token);

      setCollections(
        response.collections || []
      );
    } catch (error) {
      console.error(
        "Collections Error:",
        error
      );
    }
  };

  /* =========================
     EFFECTS
  ========================= */

  useEffect(() => {
    if (id) {
      fetchArtifact();
    }
  }, [id]);

  useEffect(() => {
    if (isAuthenticated && token) {
      checkFavorite();
      fetchCollections();
    } else {
      setIsFavorite(false);
    }
  }, [isAuthenticated, token, id]);

  /* =========================
     FAVORITE HANDLER
  ========================= */

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      alert(
        "Please login to save artifacts to favorites."
      );

      navigate("/login");

      return;
    }

    try {
      setFavoriteLoading(true);

      if (isFavorite) {
        await removeFavorite(
          token,
          artifact._id
        );

        setIsFavorite(false);
      } else {
        await addFavorite(
          token,
          artifact._id
        );

        setIsFavorite(true);
      }
    } catch (error) {
      console.error(
        "Favorite Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to update favorite."
      );
    } finally {
      setFavoriteLoading(false);
    }
  };

  /* =========================
     ADD TO COLLECTION
  ========================= */

  const handleAddToCollection =
    async () => {
      if (!isAuthenticated) {
        alert(
          "Please login to use collections."
        );

        navigate("/login");

        return;
      }

      if (!selectedCollection) {
        alert(
          "Please select a collection."
        );

        return;
      }

      try {
        await addArtifactToCollection(
          token,
          selectedCollection,
          artifact._id
        );

        alert(
          "Artifact added to collection!"
        );

        setShowCollectionModal(false);
        setSelectedCollection("");
      } catch (error) {
        console.error(
          "Add To Collection Error:",
          error
        );

        alert(
          error.response?.data?.message ||
            "Unable to add artifact to collection."
        );
      }
    };

  /* =========================
     AUDIO
  ========================= */

  const handleAudio = () => {
    const audio =
      document.getElementById(
        "artifactAudio"
      );

    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setAudioPlaying(true);
    } else {
      audio.pause();
      setAudioPlaying(false);
    }
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return <Loading />;
  }

  /* =========================
     ERROR
  ========================= */

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

  if (!artifact) {
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
      {/* =========================
          HERO
      ========================= */}

      <div
        style={{
          backgroundColor: "#17120e",
        }}
      >
        <div className="container py-4">

          {/* BACK */}

          <button
            className="btn btn-link text-decoration-none p-0 mb-4"
            style={{
              color: "#d7ad7a",
            }}
            onClick={() =>
              navigate("/artifacts")
            }
          >
            <FaArrowLeft className="me-2" />
            Back to Artifacts
          </button>

          <div className="row align-items-center g-5">

            {/* IMAGE */}

            <div className="col-lg-7">

              <div
                className="rounded-4 overflow-hidden shadow-lg"
                style={{
                  backgroundColor:
                    "#e9dfcf",
                  minHeight: "450px",
                }}
              >
                {artifact.image ? (
                  <img
                    src={artifact.image}
                    alt={artifact.title}
                    className="w-100 h-100"
                    style={{
                      minHeight: "450px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      minHeight: "450px",
                    }}
                  >
                    <span className="text-muted">
                      No Image Available
                    </span>
                  </div>
                )}
              </div>

            </div>

            {/* INFORMATION */}

            <div className="col-lg-5">

              <p
                className="mb-2"
                style={{
                  color: "#d7ad7a",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  fontSize: "13px",
                }}
              >
                Museum Artifact
              </p>

              <h1
                className="fw-bold mb-3"
                style={{
                  color: "#fff",
                }}
              >
                {artifact.title}
              </h1>

              <p
                style={{
                  color: "#d8d0c5",
                  lineHeight: "1.8",
                }}
              >
                {artifact.description}
              </p>

              {/* ACTIONS */}

              <div className="d-flex flex-wrap gap-2 mt-4">

                {/* FAVORITE */}

                <button
                  className="btn px-4"
                  disabled={favoriteLoading}
                  style={{
                    backgroundColor:
                      isFavorite
                        ? "#b78342"
                        : "transparent",
                    color: "#fff",
                    border:
                      "1px solid #b78342",
                  }}
                  onClick={handleFavorite}
                >
                  {isFavorite ? (
                    <FaHeart className="me-2" />
                  ) : (
                    <FaRegHeart className="me-2" />
                  )}

                  {favoriteLoading
                    ? "Updating..."
                    : isFavorite
                    ? "Saved"
                    : "Favorite"}
                </button>

                {/* COLLECTION */}

                <button
                  className="btn px-4"
                  style={{
                    backgroundColor:
                      "#b78342",
                    color: "#fff",
                  }}
                  onClick={() => {
                    if (!isAuthenticated) {
                      alert(
                        "Please login to use collections."
                      );

                      navigate("/login");

                      return;
                    }

                    setShowCollectionModal(
                      true
                    );
                  }}
                >
                  <FaFolderPlus className="me-2" />
                  Add to Collection
                </button>

              </div>

              {/* AUDIO */}

              {artifact.audioUrl && (
                <div className="mt-4">

                  <audio
                    id="artifactAudio"
                    src={artifact.audioUrl}
                    onEnded={() =>
                      setAudioPlaying(false)
                    }
                  />

                  <button
                    className="btn btn-outline-light"
                    onClick={handleAudio}
                  >
                    {audioPlaying ? (
                      <>
                        <FaPause className="me-2" />
                        Pause Narration
                      </>
                    ) : (
                      <>
                        <FaVolumeUp className="me-2" />
                        Play Narration
                      </>
                    )}
                  </button>

                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* =========================
          DETAILS
      ========================= */}

      <div className="container py-5">

        <div className="row g-4">

          <div className="col-md-6 col-lg-3">
            <div
              className="p-4 rounded-4 h-100"
              style={{
                backgroundColor: "#fff",
              }}
            >
              <small className="text-muted">
                Period
              </small>

              <h6
                className="fw-bold mt-2"
                style={{
                  color: "#101820",
                }}
              >
                {artifact.period ||
                  "Not specified"}
              </h6>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div
              className="p-4 rounded-4 h-100"
              style={{
                backgroundColor: "#fff",
              }}
            >
              <small className="text-muted">
                Origin
              </small>

              <h6
                className="fw-bold mt-2"
                style={{
                  color: "#101820",
                }}
              >
                {artifact.origin ||
                  "Not specified"}
              </h6>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div
              className="p-4 rounded-4 h-100"
              style={{
                backgroundColor: "#fff",
              }}
            >
              <small className="text-muted">
                Material
              </small>

              <h6
                className="fw-bold mt-2"
                style={{
                  color: "#101820",
                }}
              >
                {artifact.material ||
                  "Not specified"}
              </h6>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div
              className="p-4 rounded-4 h-100"
              style={{
                backgroundColor: "#fff",
              }}
            >
              <small className="text-muted">
                Dimensions
              </small>

              <h6
                className="fw-bold mt-2"
                style={{
                  color: "#101820",
                }}
              >
                {artifact.dimensions ||
                  "Not specified"}
              </h6>
            </div>
          </div>

        </div>

        {/* CATEGORY */}

        {artifact.category && (
          <div
            className="mt-4 p-4 rounded-4"
            style={{
              backgroundColor: "#fff",
            }}
          >
            <small className="text-muted">
              Category
            </small>

            <h5
              className="fw-bold mt-2"
              style={{
                color: "#101820",
              }}
            >
              {artifact.category.name}
            </h5>

            {artifact.category.description && (
              <p className="text-muted mb-0">
                {artifact.category.description}
              </p>
            )}
          </div>
        )}

        {/* EXHIBITION */}

        {artifact.exhibition && (
          <div
            className="mt-4 p-4 rounded-4"
            style={{
              backgroundColor: "#fff",
            }}
          >
            <small className="text-muted">
              Part of Exhibition
            </small>

            <h5
              className="fw-bold mt-2"
              style={{
                color: "#101820",
              }}
            >
              {artifact.exhibition.title}
            </h5>

            <button
              className="btn btn-sm text-white mt-2"
              style={{
                backgroundColor: "#b78342",
              }}
              onClick={() =>
                navigate(
                  `/exhibitions/${artifact.exhibition._id}`
                )
              }
            >
              View Exhibition
            </button>
          </div>
        )}

      </div>

      {/* =========================
          COLLECTION MODAL
      ========================= */}

      {showCollectionModal && (
        <div
          className="modal d-block"
          style={{
            backgroundColor:
              "rgba(0,0,0,0.65)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content border-0 rounded-4">

              <div className="modal-header">

                <h5 className="modal-title fw-bold">
                  Add to Collection
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setShowCollectionModal(
                      false
                    )
                  }
                ></button>

              </div>

              <div className="modal-body">

                {collections.length === 0 ? (
                  <div className="text-center py-3">

                    <p className="text-muted">
                      You don't have any
                      collections yet.
                    </p>

                    <button
                      className="btn text-white"
                      style={{
                        backgroundColor:
                          "#b78342",
                      }}
                      onClick={() =>
                        navigate(
                          "/collections"
                        )
                      }
                    >
                      Create Collection
                    </button>

                  </div>
                ) : (
                  <>
                    <label className="form-label fw-semibold">
                      Select Collection
                    </label>

                    <select
                      className="form-select"
                      value={
                        selectedCollection
                      }
                      onChange={(e) =>
                        setSelectedCollection(
                          e.target.value
                        )
                      }
                    >
                      <option value="">
                        Choose a collection
                      </option>

                      {collections.map(
                        (collection) => (
                          <option
                            key={
                              collection._id
                            }
                            value={
                              collection._id
                            }
                          >
                            {collection.name}
                          </option>
                        )
                      )}
                    </select>
                  </>
                )}

              </div>

              {collections.length > 0 && (
                <div className="modal-footer">

                  <button
                    className="btn btn-light"
                    onClick={() =>
                      setShowCollectionModal(
                        false
                      )
                    }
                  >
                    Cancel
                  </button>

                  <button
                    className="btn text-white"
                    style={{
                      backgroundColor:
                        "#b78342",
                    }}
                    onClick={
                      handleAddToCollection
                    }
                  >
                    Add Artifact
                  </button>

                </div>
              )}

            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ArtifactDetails;