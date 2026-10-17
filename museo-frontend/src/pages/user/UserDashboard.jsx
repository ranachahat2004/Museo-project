import {
  Link,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";


function UserDashboard() {

  const {
    user,
    logout,
  } = useAuth();


  return (
    <div className="bg-light min-vh-100">

      {/* NAVBAR */}

      <nav className="navbar navbar-dark bg-dark">

        <div className="container">

          <Link
            to="/dashboard"
            className="navbar-brand fw-bold"
          >
            MUSEO
          </Link>


          <button
            type="button"
            className="btn btn-outline-light btn-sm"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </nav>


      <div className="container py-5">

        {/* WELCOME */}

        <div className="mb-5">

          <p className="text-muted mb-1">
            MY MUSEO
          </p>

          <h1 className="fw-bold">
            Welcome, {user?.name}
          </h1>

          <p className="text-muted">
            Explore exhibitions and
            discover museum collections.
          </p>

        </div>


        {/* CARDS */}

        <div className="row g-4">

          {/* EXHIBITIONS */}

          <div className="col-md-6">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body p-4">

                <h3 className="fw-bold">
                  Explore Exhibitions
                </h3>

                <p className="text-muted">
                  Discover current and upcoming
                  exhibitions available at MUSEO.
                </p>

                <Link
                  to="/exhibitions"
                  className="btn btn-dark"
                >
                  Explore Now
                </Link>

              </div>

            </div>

          </div>


          {/* CATEGORIES */}

          <div className="col-md-6">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body p-4">

                <h3 className="fw-bold">
                  Browse Collections
                </h3>

                <p className="text-muted">
                  Explore museum collections
                  by category.
                </p>

                <Link
                  to="/categories"
                  className="btn btn-outline-dark"
                >
                  Browse Collections
                </Link>

              </div>

            </div>

          </div>


          {/* PROFILE */}

          <div className="col-12">

            <div className="card border-0 shadow-sm">

              <div className="card-body p-4">

                {/* <h4 className="fw-bold">
                  My Profile
                </h4> */}

                <div className="row mt-3">

                  <div className="col-md-6">

                    {/* <small className="text-muted">
                      NAME
                    </small> */}

                    <p className="fw-semibold">
                      {user?.name}
                    </p>

                  </div>


                  {/* <div className="col-md-6">

                    <small className="text-muted">
                      EMAIL
                    </small>

                    <p className="fw-semibold">
                      {user?.email}
                    </p>

                  </div> */}

                </div>

                {/* <button
                  type="button"
                  className="btn btn-outline-dark"
                >
                  Edit Profile
                </button> */}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default UserDashboard;