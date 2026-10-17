import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCategories,
} from "../../services/categoryService";

import PageHeader from "../../components/common/PageHeader";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

const Categories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getCategories();

      setCategories(
        response.categories || []
      );
    } catch (error) {
      console.error(
        "Categories Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load categories."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f1e8",
      }}
    >
      <PageHeader
        title="Categories"
        subtitle="Explore museum collections through different cultures, periods and themes."
      />

      <div className="container py-5">

        {/* Loading */}
        {loading && <Loading />}

        {/* Error */}
        {!loading && error && (
          <ErrorMessage message={error} />
        )}

        {/* Categories */}
        {!loading &&
          !error &&
          categories.length > 0 && (
            <div className="row g-4">

              {categories.map((category) => (
                <div
                  className="col-lg-4 col-md-6"
                  key={category._id}
                >
                  <div
                    className="card h-100 border-0 shadow-sm"
                    style={{
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      navigate(
                        `/artifacts?category=${category._id}`
                      )
                    }
                  >

                    {/* Image */}
                    <div
                      style={{
                        height: "230px",
                        overflow: "hidden",
                        backgroundColor:
                          "#e9dfcf",
                      }}
                    >
                      <img
                        src={
                          category.image ||
                          "https://via.placeholder.com/600x400?text=MUSEO+Category"
                        }
                        alt={category.name}
                        className="w-100 h-100"
                        style={{
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/600x400?text=MUSEO+Category";
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="card-body p-4">

                      <p
                        className="text-uppercase fw-semibold mb-2"
                        style={{
                          color: "#b78342",
                          letterSpacing: "1.5px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Museum Category
                      </p>

                      <h4
                        className="fw-bold mb-3"
                        style={{
                          color: "#101820",
                        }}
                      >
                        {category.name}
                      </h4>

                      <p
                        className="text-muted mb-4"
                        style={{
                          lineHeight: "1.7",
                        }}
                      >
                        {category.description ||
                          "Explore artifacts and stories belonging to this museum category."}
                      </p>

                      <span
                        className="fw-semibold"
                        style={{
                          color: "#b78342",
                        }}
                      >
                        Explore Collection →
                      </span>

                    </div>
                  </div>
                </div>
              ))}

            </div>
          )}

        {/* Empty */}
        {!loading &&
          !error &&
          categories.length === 0 && (
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
                No Categories Available
              </h4>

              <p className="text-muted">
                Museum categories will appear
                here once they are added.
              </p>

            </div>
          )}

      </div>
    </div>
  );
};

export default Categories;