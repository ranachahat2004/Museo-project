import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getTimelineEvents,
} from "../../services/timelineService";

import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";

const TimelinePreview = () => {
  const navigate = useNavigate();

  const [timeline, setTimeline] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchTimeline = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getTimelineEvents();

      setTimeline(
        response.timeline || []
      );
    } catch (error) {
      console.error(
        "Timeline Preview Error:",
        error
      );

      setError(
        "Unable to load timeline."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, []);

  return (
    <section
      className="py-5"
      style={{
        backgroundColor: "#101820",
      }}
    >
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-5">

          <p
            className="text-uppercase fw-semibold mb-2"
            style={{
              color: "#d7ad7a",
              letterSpacing:
                "3px",
              fontSize: "0.8rem",
            }}
          >
            Journey Through History
          </p>

          <h2
            className="fw-bold text-white mb-3"
            style={{
              fontSize:
                "clamp(2rem, 4vw, 3rem)",
            }}
          >
            Explore The Timeline
          </h2>

          <p
            className="text-light opacity-75 mx-auto"
            style={{
              maxWidth: "650px",
              lineHeight: "1.8",
            }}
          >
            Discover important moments and
            civilizations through a journey
            across time.
          </p>

        </div>

        {loading && (
          <div className="bg-white p-4 rounded">
            <Loading />
          </div>
        )}

        {!loading && error && (
          <ErrorMessage message={error} />
        )}

        {!loading &&
          !error &&
          timeline.length > 0 && (
            <div className="row g-4">

              {timeline
                .slice(0, 3)
                .map((event) => (
                  <div
                    className="col-lg-4 col-md-6"
                    key={event._id}
                  >
                    <div
                      className="h-100 p-4"
                      style={{
                        backgroundColor:
                          "#171f26",
                        border:
                          "1px solid rgba(215,173,122,0.25)",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate(
                          "/timeline"
                        )
                      }
                    >

                      <span
                        className="badge rounded-pill px-3 py-2 mb-3"
                        style={{
                          backgroundColor:
                            "#b78342",
                        }}
                      >
                        {event.year}
                      </span>

                      <h4
                        className="fw-bold text-white mb-3"
                      >
                        {event.title}
                      </h4>

                      <p
                        className="text-light opacity-75 mb-3"
                        style={{
                          lineHeight:
                            "1.7",
                        }}
                      >
                        {
                          event.description
                        }
                      </p>

                      {event.location && (
                        <small
                          className="text-light opacity-75"
                        >
                          📍{" "}
                          {
                            event.location
                          }
                        </small>
                      )}

                    </div>
                  </div>
                ))}

            </div>
          )}

        {!loading &&
          !error &&
          timeline.length === 0 && (
            <div className="text-center text-white py-4">
              <p className="opacity-75 mb-0">
                Timeline information will
                appear here soon.
              </p>
            </div>
          )}

        {/* View Timeline */}
        {!loading &&
          !error &&
          timeline.length > 0 && (
            <div className="text-center mt-5">

              <button
                className="btn px-4 py-2 fw-semibold"
                style={{
                  border:
                    "1px solid #d7ad7a",
                  color: "#d7ad7a",
                  borderRadius: "0",
                }}
                onClick={() =>
                  navigate("/timeline")
                }
              >
                Explore Full Timeline →
              </button>

            </div>
          )}

      </div>
    </section>
  );
};

export default TimelinePreview;