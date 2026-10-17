import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  FaSearch,
  FaArrowRight,
} from "react-icons/fa";

import {
  getArtifacts,
} from "../../services/artifactService";

import PageHeader from "../../components/common/PageHeader";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

const Artifacts = () => {
  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const urlSearch =
    searchParams.get("search") || "";

  const categoryId =
    searchParams.get("category") || "";

  const [artifacts, setArtifacts] =
    useState([]);

  const [filteredArtifacts, setFilteredArtifacts] =
    useState([]);

  const [search, setSearch] =
    useState(urlSearch);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =========================
     FETCH ARTIFACTS
  ========================= */

  const fetchArtifacts = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getArtifacts();

      setArtifacts(
        response.artifacts || []
      );
    } catch (error) {
      console.error(
        "Artifacts Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load artifacts."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtifacts();
  }, []);

  /* =========================
     FILTER
  ========================= */

  useEffect(() => {
    let result = [...artifacts];

    const searchValue =
      search.trim().toLowerCase();

    if (searchValue) {
      result = result.filter(
        (artifact) =>
          artifact.title
            ?.toLowerCase()
            .includes(searchValue) ||
          artifact.description
            ?.toLowerCase()
            .includes(searchValue) ||
          artifact.period
            ?.toLowerCase()
            .includes(searchValue) ||
          artifact.origin
            ?.toLowerCase()
            .includes(searchValue)
      );
    }

    if (categoryId) {
      result = result.filter(
        (artifact) =>
          artifact.category?._id ===
          categoryId
      );
    }

    setFilteredArtifacts(result);
  }, [
    artifacts,
    search,
    categoryId,
  ]);

  /* =========================
     SEARCH
  ========================= */

  const handleSearch = (e) => {
    setSearch(e.target.value);
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
      <PageHeader
        title="Museum Artifacts"
        subtitle="Explore stories, objects and treasures from different periods and cultures."
      />

      <div className="container py-5">

        {/* SEARCH */}

        <div className="row mb-5">
          <div className="col-lg-7 mx-auto">

            <div className="input-group">

              <span className="input-group-text bg-white">
                <FaSearch
                  style={{
                    color: "#b78342",
                  }}
                />
              </span>

              <input
                type="search"
                className="form-control"
                placeholder="Search artifacts..."
                value={search}
                onChange={handleSearch}
              />

            </div>

          </div>
        </div>

        {error && (
          <ErrorMessage message={error} />
        )}

        {/* RESULT COUNT */}

        {!error && (
          <div className="mb-4">

            <h5
              className="fw-bold"
              style={{
                color: "#101820",
              }}
            >
              {filteredArtifacts.length}{" "}
              Artifact
              {filteredArtifacts.length !==
              1
                ? "s"
                : ""}
            </h5>

            {categoryId && (
              <p className="text-muted mb-0">
                Showing artifacts from
                selected category.
              </p>
            )}

          </div>
        )}

        {/* EMPTY */}

        {!error &&
          filteredArtifacts.length ===
            0 && (
            <div
              className="text-center py-5 rounded-4"
              style={{
                backgroundColor: "#fff",
              }}
            >
              <h4
                className="fw-bold"
                style={{
                  color: "#101820",
                }}
              >
                No Artifacts Found
              </h4>

              <p className="text-muted">
                Try a different search term.
              </p>

              <button
                className="btn text-white"
                style={{
                  backgroundColor:
                    "#b78342",
                }}
                onClick={() =>
                  setSearch("")
                }
              >
                Clear Search
              </button>
            </div>
          )}

        {/* ARTIFACT CARDS */}

        <div className="row g-4">

          {filteredArtifacts.map(
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

                  {/* IMAGE */}

                  <div
                    style={{
                      height: "270px",
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

                  {/* BODY */}

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
                      {artifact.shortDescription ||
                        artifact.description ||
                        "Museum artifact"}
                    </p>

                    <div className="small mb-3">

                      {artifact.period && (
                        <span className="me-3">
                          <strong>
                            Period:
                          </strong>{" "}
                          {artifact.period}
                        </span>
                      )}

                      {artifact.origin && (
                        <span>
                          <strong>
                            Origin:
                          </strong>{" "}
                          {artifact.origin}
                        </span>
                      )}

                    </div>

                    <button
                      className="btn text-white w-100"
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
                      Explore Artifact
                      <FaArrowRight className="ms-2" />
                    </button>

                  </div>
                </div>

              </div>
            )
          )}

        </div>
      </div>
    </div>
  );
};

export default Artifacts;