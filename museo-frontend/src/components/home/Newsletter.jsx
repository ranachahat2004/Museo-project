import React, { useState } from "react";
import { FiMail, FiCheck } from "react-icons/fi";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubmitted(true);
    setEmail("");
  };

  return (
    <section
      className="py-5"
      style={{
        backgroundColor: "#e9dfcf",
      }}
    >
      <div className="container py-lg-4">

        <div className="row justify-content-center text-center">
          <div className="col-lg-8">

            {/* Icon */}
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#101820",
              }}
            >
              {submitted ? (
                <FiCheck size={25} color="#c89b5c" />
              ) : (
                <FiMail size={25} color="#c89b5c" />
              )}
            </div>

            {!submitted ? (
              <>
                <p
                  className="text-uppercase fw-semibold mb-2"
                  style={{
                    color: "#b78342",
                    letterSpacing: "3px",
                    fontSize: "13px",
                  }}
                >
                  Stay Connected
                </p>

                <h2
                  className="display-6 fw-bold mb-3"
                  style={{
                    fontFamily: "Georgia, serif",
                    color: "#101820",
                  }}
                >
                  Discover More Stories
                </h2>

                <p className="text-secondary mb-4">
                  Subscribe to receive new exhibitions, fascinating artifacts
                  and stories from the world of history and culture.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="row g-2 justify-content-center"
                >
                  <div className="col-md-7">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-auto">
                    <button
                      type="submit"
                      className="btn btn-lg text-white w-100"
                      style={{
                        backgroundColor: "#101820",
                      }}
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2
                  className="display-6 fw-bold mb-3"
                  style={{
                    fontFamily: "Georgia, serif",
                    color: "#101820",
                  }}
                >
                  Thank You!
                </h2>

                <p className="text-secondary mb-0">
                  You have successfully subscribed to the MUSEO newsletter.
                </p>
              </>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};

export default Newsletter;