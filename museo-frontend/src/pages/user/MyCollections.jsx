import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaFolderOpen, FaTrash } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import {
  createCollection,
  getMyCollections,
  deleteCollection,
} from "../../services/collectionService";

import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

const MyCollections = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isPublic: false,
  });

  const fetchCollections = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyCollections(token);

      setCollections(response.collections || []);
    } catch (error) {
      console.error("Collections Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load your collections."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCollections();
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateCollection = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter collection name.");
      return;
    }

    try {
      const response = await createCollection(
        token,
        formData
      );

      setCollections((prev) => [
        response.collection,
        ...prev,
      ]);

      setFormData({
        name: "",
        description: "",
        isPublic: false,
      });

      setShowModal(false);

      alert("Collection created successfully!");
    } catch (error) {
      console.error("Create Collection Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to create collection."
      );
    }
  };

  const handleDeleteCollection = async (
    collectionId
  ) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this collection?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCollection(
        token,
        collectionId
      );

      setCollections((prev) =>
        prev.filter(
          (collection) =>
            collection._id !== collectionId
        )
      );

      alert("Collection deleted successfully.");
    } catch (error) {
      console.error(
        "Delete Collection Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to delete collection."
      );
    }
  };

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
            Personal Museum
          </p>

          <h1 className="fw-bold mb-2">
            My Collections
          </h1>

          <p
            className="mb-0"
            style={{ color: "#d8d0c5" }}
          >
            Save and organize the artifacts
            you love.
          </p>
        </div>
      </div>

      <div className="container py-5">
        {/* TOP BAR */}

        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h4
              className="fw-bold mb-1"
              style={{ color: "#101820" }}
            >
              Your Collections
            </h4>

            <p className="text-muted mb-0">
              {collections.length} collection
              {collections.length !== 1
                ? "s"
                : ""}
            </p>
          </div>

          <button
            className="btn text-white px-4"
            style={{
              backgroundColor: "#b78342",
            }}
            onClick={() => setShowModal(true)}
          >
            <FaPlus className="me-2" />
            New Collection
          </button>
        </div>

        {error && (
          <ErrorMessage message={error} />
        )}

        {/* COLLECTIONS */}

        {!error &&
          collections.length === 0 && (
            <div
              className="text-center py-5 rounded-4"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #e9dfcf",
              }}
            >
              <FaFolderOpen
                size={45}
                style={{ color: "#b78342" }}
              />

              <h4
                className="fw-bold mt-3"
                style={{ color: "#101820" }}
              >
                No Collections Yet
              </h4>

              <p className="text-muted">
                Create your first collection and
                start saving museum artifacts.
              </p>

              <button
                className="btn text-white"
                style={{
                  backgroundColor: "#b78342",
                }}
                onClick={() =>
                  setShowModal(true)
                }
              >
                Create Collection
              </button>
            </div>
          )}

        <div className="row g-4">
          {collections.map((collection) => (
            <div
              className="col-md-6 col-lg-4"
              key={collection._id}
            >
              <div
                className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden"
                style={{
                  backgroundColor: "#fff",
                }}
              >
                {/* PREVIEW IMAGE */}

                <div
                  style={{
                    height: "210px",
                    backgroundColor: "#e9dfcf",
                  }}
                >
                  {collection.artifacts?.length >
                    0 &&
                  collection.artifacts[0]?.image ? (
                    <img
                      src={
                        collection.artifacts[0]
                          .image
                      }
                      alt={collection.name}
                      className="w-100 h-100"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div className="h-100 d-flex align-items-center justify-content-center">
                      <FaFolderOpen
                        size={55}
                        style={{
                          color: "#b78342",
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="card-body p-4">
                  <h5
                    className="fw-bold"
                    style={{ color: "#101820" }}
                  >
                    {collection.name}
                  </h5>

                  <p className="text-muted small">
                    {collection.description ||
                      "A personal collection of museum artifacts."}
                  </p>

                  <p className="small mb-3">
                    <strong>
                      {collection.artifacts
                        ?.length || 0}
                    </strong>{" "}
                    artifact
                    {collection.artifacts
                      ?.length !== 1
                      ? "s"
                      : ""}
                  </p>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm text-white flex-grow-1"
                      style={{
                        backgroundColor:
                          "#b78342",
                      }}
                      onClick={() =>
                        navigate(
                          `/collections/${collection._id}`
                        )
                      }
                    >
                      View Collection
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        handleDeleteCollection(
                          collection._id
                        )
                      }
                      title="Delete collection"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CREATE COLLECTION MODAL */}

      {showModal && (
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
                <h5
                  className="modal-title fw-bold"
                  style={{ color: "#101820" }}
                >
                  Create New Collection
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setShowModal(false)
                  }
                ></button>
              </div>

              <form
                onSubmit={handleCreateCollection}
              >
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Collection Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Example: Ancient Treasures"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={
                        formData.description
                      }
                      onChange={handleChange}
                      className="form-control"
                      rows="3"
                      placeholder="Describe your collection..."
                    ></textarea>
                  </div>

                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="isPublic"
                      checked={
                        formData.isPublic
                      }
                      onChange={handleChange}
                      className="form-check-input"
                      id="publicCollection"
                    />

                    <label
                      className="form-check-label"
                      htmlFor="publicCollection"
                    >
                      Make this collection public
                    </label>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() =>
                      setShowModal(false)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn text-white"
                    style={{
                      backgroundColor:
                        "#b78342",
                    }}
                  >
                    Create Collection
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCollections;