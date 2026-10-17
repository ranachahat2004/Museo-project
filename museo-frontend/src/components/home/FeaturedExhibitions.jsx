import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFeaturedExhibitions } from "../../services/exhibitionService";

import ExhibitionCard from "./ExhibitionCard";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";

const FeaturedExhibitions = () => {
  const navigate = useNavigate();

  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch featured exhibitions from backend
  const fetchFeaturedExhibitions = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getFeaturedExhibitions();

      setExhibitions(
        response.exhibitions || []
      );
    } catch (error) {
      console.error(
        "Featured Exhibitions Error:",
        error
      );

      setError(
        "Unable to load featured exhibitions."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedExhibitions();
  }, []);

  // Open exhibition details
  const handleViewExhibition = (exhibition) => {
    navigate(
      `/exhibitions/${exhibition._id}`
    );
  };

  return (
    <section
      className="py-5"
      style={{
        backgroundColor: "#f5f1e8",
      }}
    >
      <div className="container">

        {/* Section Heading */}
        <div className="text-center mb-5">

          <p
            className="text-uppercase fw-semibold mb-2"
            style={{
              color: "#b78342",
              letterSpacing: "3px",
              fontSize: "0.8rem",
            }}
          >
            Discover Our Collection
          </p>

          <h2
            className="fw-bold mb-3"
            style={{
              color: "#101820",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            Featured Exhibitions
          </h2>

          <p
            className="text-muted mx-auto"
            style={{
              maxWidth: "650px",
              lineHeight: "1.8",
            }}
          >
            Explore remarkable exhibitions and
            discover stories, cultures and
            historical treasures from around
            the world.
          </p>

        </div>

        {/* Loading */}
        {loading && <Loading />}

        {/* Error */}
        {!loading && error && (
          <ErrorMessage message={error} />
        )}

        {/* No Data */}
        {!loading &&
          !error &&
          exhibitions.length === 0 && (
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
                No Featured Exhibitions
              </h5>

              <p className="text-muted">
                Featured exhibitions will appear
                here soon.
              </p>

            </div>
          )}

        {/* Exhibition Cards */}
        {!loading &&
          !error &&
          exhibitions.length > 0 && (
            <div className="row g-4">

              {exhibitions.map(
                (exhibition) => (
                  <div
                    className="col-lg-4 col-md-6"
                    key={exhibition._id}
                  >
                    <ExhibitionCard
                      exhibition={exhibition}
                      onView={
                        handleViewExhibition
                      }
                    />
                  </div>
                )
              )}

            </div>
          )}

        {/* View All Button */}
        {!loading &&
          !error &&
          exhibitions.length > 0 && (
            <div className="text-center mt-5">

              <button
                type="button"
                className="btn px-4 py-2 fw-semibold"
                style={{
                  border: "1px solid #b78342",
                  color: "#b78342",
                  borderRadius: "0",
                }}
                onClick={() =>
                  navigate("/exhibitions")
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "#b78342";
                  e.currentTarget.style.color =
                    "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "transparent";
                  e.currentTarget.style.color =
                    "#b78342";
                }}
              >
                View All Exhibitions
              </button>

            </div>
          )}

      </div>
    </section>
  );
};

export default FeaturedExhibitions;