import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getExhibitions,
} from "../../services/exhibitionService";

import PageHeader from "../../components/common/PageHeader";
import ExhibitionCard from "../../components/home/ExhibitionCard";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

const Exhibitions = () => {
  const navigate = useNavigate();

  const [exhibitions, setExhibitions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  // Fetch exhibitions
  const fetchExhibitions = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getExhibitions();

      setExhibitions(
        response.exhibitions || []
      );
    } catch (error) {
      console.error(
        "Exhibitions Error:",
        error
      );

      setError(
        "Unable to load exhibitions."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExhibitions();
  }, []);

  // Search exhibitions
  const filteredExhibitions =
    exhibitions.filter((exhibition) => {
      const searchText =
        search.toLowerCase();

      return (
        exhibition.title
          ?.toLowerCase()
          .includes(searchText) ||
        exhibition.description
          ?.toLowerCase()
          .includes(searchText) ||
        exhibition.period
          ?.toLowerCase()
          .includes(searchText) ||
        exhibition.location
          ?.toLowerCase()
          .includes(searchText)
      );
    });

  // Open details
  const handleViewExhibition = (
    exhibition
  ) => {
    navigate(
      `/exhibitions/${exhibition._id}`
    );
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f1e8",
        minHeight: "100vh",
      }}
    >

      {/* Page Header */}
      <PageHeader
        title="Exhibitions"
        subtitle="Explore the stories and collections preserved in MUSEO."
      />

      <div className="container py-5">

        {/* Search */}
        <div className="row justify-content-center mb-5">

          <div className="col-lg-7">

            <div className="input-group">

              <span
                className="input-group-text bg-white"
                style={{
                  borderColor: "#ddd2c0",
                  color: "#b78342",
                }}
              >
                🔍
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Search exhibitions..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                style={{
                  borderColor: "#ddd2c0",
                  boxShadow: "none",
                }}
              />

            </div>

          </div>

        </div>

        {/* Loading */}
        {loading && <Loading />}

        {/* Error */}
        {!loading && error && (
          <ErrorMessage message={error} />
        )}

        {/* Results */}
        {!loading &&
          !error &&
          filteredExhibitions.length > 0 && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">

                <h4
                  className="fw-bold mb-0"
                  style={{
                    color: "#101820",
                  }}
                >
                  Explore Exhibitions
                </h4>

                <span
                  className="small"
                  style={{
                    color: "#777",
                  }}
                >
                  {filteredExhibitions.length}{" "}
                  exhibition
                  {filteredExhibitions.length !==
                  1
                    ? "s"
                    : ""}
                </span>

              </div>

              <div className="row g-4">

                {filteredExhibitions.map(
                  (exhibition) => (
                    <div
                      className="col-lg-4 col-md-6"
                      key={
                        exhibition._id
                      }
                    >
                      <ExhibitionCard
                        exhibition={
                          exhibition
                        }
                        onView={
                          handleViewExhibition
                        }
                      />
                    </div>
                  )
                )}

              </div>
            </>
          )}

        {/* No Results */}
        {!loading &&
          !error &&
          filteredExhibitions.length ===
            0 && (
            <div className="text-center py-5">

              <div
                className="display-4 mb-3"
                style={{
                  color: "#b78342",
                }}
              >
                ◇
              </div>

              <h4
                className="fw-bold"
                style={{
                  color: "#101820",
                }}
              >
                No Exhibitions Found
              </h4>

              <p className="text-muted">
                Try searching with a different
                keyword.
              </p>

              {search && (
                <button
                  className="btn btn-sm"
                  style={{
                    backgroundColor:
                      "#b78342",
                    color: "#fff",
                  }}
                  onClick={() =>
                    setSearch("")
                  }
                >
                  Clear Search
                </button>
              )}

            </div>
          )}

      </div>
    </div>
  );
};

export default Exhibitions;