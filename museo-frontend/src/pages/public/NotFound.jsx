import React from "react";

import { Link } from "react-router-dom";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";


function NotFound() {

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="text-center py-5">

          <h1
            className="display-1 fw-bold"
          >
            404
          </h1>

          <h2 className="fw-bold">
            Page Not Found
          </h2>

          <p className="text-muted mb-4">
            The page you are looking for
            does not exist.
          </p>

          <Link
            to="/"
            className="btn btn-dark px-4"
          >
            Back to Home
          </Link>

        </div>

      </div>

      <Footer />
    </>
  );
}


export default NotFound;