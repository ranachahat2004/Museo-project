import { useEffect, useState } from "react";

import {
  getCategories
} from "../../services/categoryService";

function CategorySection() {

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {

    const loadCategories = async () => {

      try {

        const response =
          await getCategories();

        setCategories(
          response.categories
        );

      } catch (error) {

        console.error(
          "Category Error:",
          error
        );

        setError(
          "Unable to load categories."
        );

      } finally {

        setLoading(false);

      }
    };


    loadCategories();

  }, []);


  return (
    <section className="py-5">

      <div className="container">

        <div className="text-center mb-5">

          <p className="text-uppercase text-muted small fw-semibold">
            Explore MUSEO
          </p>

          <h2 className="fw-bold">
            Explore Collections
          </h2>

          <p className="text-muted">
            Discover history, art and culture
            through our collections.
          </p>

        </div>


        {loading && (
          <div className="text-center py-5">

            <div
              className="spinner-border"
              role="status"
            />

            <p className="mt-3 text-muted">
              Loading collections...
            </p>

          </div>
        )}


        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}


        {!loading &&
          !error &&
          categories.length === 0 && (

            <div className="text-center">
              <p className="text-muted">
                No collections available yet.
              </p>
            </div>

          )}


        {!loading &&
          !error &&
          categories.length > 0 && (

            <div className="row g-4">

              {categories.map(
                (category) => (

                  <div
                    className="col-lg-3 col-md-6"
                    key={category._id}
                  >

                    <div className="card h-100 border-0 shadow-sm">

                      {category.image ? (

                        <img
                          src={category.image}
                          className="card-img-top"
                          alt={category.name}
                          style={{
                            height: "220px",
                            objectFit: "cover"
                          }}
                        />

                      ) : (

                        <div
                          className="bg-dark text-white d-flex align-items-center justify-content-center"
                          style={{
                            height: "220px"
                          }}
                        >
                          <span>
                            MUSEO
                          </span>
                        </div>

                      )}


                      <div className="card-body">

                        <h5 className="card-title fw-bold">
                          {category.name}
                        </h5>

                        <p className="card-text text-muted">
                          {category.description}
                        </p>

                        <button
                          className="btn btn-outline-dark btn-sm"
                        >
                          Explore
                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

      </div>

    </section>
  );
}

export default CategorySection;