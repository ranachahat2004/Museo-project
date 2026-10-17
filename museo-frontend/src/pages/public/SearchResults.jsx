import React from "react";

import { useSearchParams } from "react-router-dom";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";


function SearchResults() {

  const [
    searchParams
  ] = useSearchParams();

  const query =
    searchParams.get("q") || "";


  return (
    <>
      <Navbar />

      <section className="bg-light py-5">

        <div className="container">

          <h1 className="fw-bold">
            Search Results
          </h1>

          <p className="text-muted mb-0">

            {query
              ? `Showing results for "${query}"`
              : "Search museum artifacts, exhibitions and categories."
            }

          </p>

        </div>

      </section>


      <section className="py-5">

        <div className="container">

          <div className="card border-0 shadow-sm">

            <div className="card-body text-center py-5">

              <h4 className="fw-bold">
                Search functionality
              </h4>

              <p className="text-muted">
                Search results will be connected
                to the backend API as we complete
                the search module.
              </p>

            </div>

          </div>

        </div>

      </section>


      <Footer />
    </>
  );
}


export default SearchResults;