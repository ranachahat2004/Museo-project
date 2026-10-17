import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getExhibitionById,
} from "../../services/exhibitionService";

import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

const ExhibitionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exhibition, setExhibition] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchExhibition = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getExhibitionById(id);

      setExhibition(
        response.exhibition
      );
    } catch (error) {
      console.error(
        "Exhibition Details Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load exhibition details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExhibition();
  }, [id]);

  if (loading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: "#f5f1e8",
        }}
      >
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-vh-100 py-5"
        style={{
          backgroundColor: "#f5f1e8",
        }}
      >
        <div className="container">
          <ErrorMessage message={error} />

          <div className="text-center mt-4">
            <button
              className="btn"
              style={{
                backgroundColor: "#b78342",
                color: "#fff",
              }}
              onClick={() =>
                navigate("/exhibitions")
              }
            >
              Back to Exhibitions
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!exhibition) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: "#f5f1e8",
        minHeight: "100vh",
      }}
    >
      {/* Hero Image */}
      <section
        style={{
          position: "relative",
          minHeight: "480px",
          backgroundImage: `url(${
            exhibition.coverImage ||
            exhibition.image ||
            "https://via.placeholder.com/1600x700?text=MUSEO+Exhibition"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(16,24,32,0.9), rgba(16,24,32,0.25))",
          }}
        ></div>

        <div
          className="container h-100 d-flex align-items-end"
          style={{
            position: "relative",
            minHeight: "480px",
          }}
        >
          <div
            className="text-white pb-5"
            style={{
              maxWidth: "850px",
            }}
          >
            <span
              className="badge rounded-pill px-3 py-2 mb-3"
              style={{
                backgroundColor: "#b78342",
              }}
            >
              {exhibition.status ||
                "Exhibition"}
            </span>

            <h1
              className="display-4 fw-bold mb-3"
            >
              {exhibition.title}
            </h1>

            {exhibition.period && (
              <p className="fs-5 mb-2">
                {exhibition.period}
              </p>
            )}

            {exhibition.location && (
              <p className="mb-0 text-light">
                📍 {exhibition.location}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-5">
        <div className="container">

          <div className="row g-5">

            {/* Main Description */}
            <div className="col-lg-8">

              <p
                className="text-uppercase fw-semibold mb-2"
                style={{
                  color: "#b78342",
                  letterSpacing: "2px",
                  fontSize: "0.8rem",
                }}
              >
                About The Exhibition
              </p>

              <h2
                className="fw-bold mb-4"
                style={{
                  color: "#101820",
                }}
              >
                {exhibition.title}
              </h2>

              <p
                className="text-secondary"
                style={{
                  fontSize: "1.05rem",
                  lineHeight: "1.9",
                }}
              >
                {exhibition.description}
              </p>

              {exhibition.shortDescription && (
                <div
                  className="mt-4 p-4"
                  style={{
                    backgroundColor: "#e9dfcf",
                    borderLeft:
                      "4px solid #b78342",
                  }}
                >
                  <p className="mb-0 text-dark">
                    {
                      exhibition.shortDescription
                    }
                  </p>
                </div>
              )}

            </div>

            {/* Information Card */}
            <div className="col-lg-4">

              <div
                className="card border-0 shadow-sm"
                style={{
                  backgroundColor: "#fff",
                }}
              >
                <div className="card-body p-4">

                  <h5
                    className="fw-bold mb-4"
                    style={{
                      color: "#101820",
                    }}
                  >
                    Exhibition Information
                  </h5>

                  {exhibition.period && (
                    <div className="mb-4">
                      <small className="text-muted">
                        Period
                      </small>
                      <div className="fw-semibold mt-1">
                        {exhibition.period}
                      </div>
                    </div>
                  )}

                  {exhibition.location && (
                    <div className="mb-4">
                      <small className="text-muted">
                        Location
                      </small>
                      <div className="fw-semibold mt-1">
                        {exhibition.location}
                      </div>
                    </div>
                  )}

                  {exhibition.category && (
                    <div className="mb-4">
                      <small className="text-muted">
                        Category
                      </small>
                      <div className="fw-semibold mt-1">
                        {exhibition.category.name}
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <small className="text-muted">
                      Status
                    </small>

                    <div className="mt-1">
                      <span
                        className="badge"
                        style={{
                          backgroundColor:
                            "#b78342",
                        }}
                      >
                        {exhibition.status ||
                          "Available"}
                      </span>
                    </div>
                  </div>

                  <button
                    className="btn w-100 py-2"
                    style={{
                      backgroundColor:
                        "#101820",
                      color: "#fff",
                    }}
                    onClick={() =>
                      navigate("/exhibitions")
                    }
                  >
                    ← Back to Exhibitions
                  </button>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default ExhibitionDetails;