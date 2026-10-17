import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getTimelineEvents,
} from "../../services/timelineService";

import PageHeader from "../../components/common/PageHeader";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

const Timeline = () => {
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
        "Timeline Error:",
        error
      );

      setError(
        error.response?.data?.message ||
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
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f1e8",
      }}
    >
      <PageHeader
        title="Museum Timeline"
        subtitle="Travel through important periods, civilizations and historical moments."
      />

      <div className="container py-5">

        {loading && <Loading />}

        {!loading && error && (
          <ErrorMessage message={error} />
        )}

        {!loading &&
          !error &&
          timeline.length > 0 && (
            <div className="position-relative">

              {/* Vertical Line */}
              <div
                className="d-none d-md-block"
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: "50%",
                  width: "2px",
                  backgroundColor:
                    "#c89b5c",
                  transform:
                    "translateX(-50%)",
                }}
              ></div>

              {timeline.map(
                (event, index) => {
                  const isEven =
                    index % 2 === 0;

                  return (
                    <div
                      key={event._id}
                      className="row position-relative mb-5"
                    >

                      {/* Left */}
                      <div
                        className={`col-md-6 ${
                          isEven
                            ? ""
                            : "offset-md-6"
                        }`}
                      >
                        <div
                          className="card border-0 shadow-sm"
                          style={{
                            backgroundColor:
                              "#ffffff",
                          }}
                        >

                          {event.image && (
                            <img
                              src={event.image}
                              alt={
                                event.title
                              }
                              className="card-img-top"
                              style={{
                                height:
                                  "230px",
                                objectFit:
                                  "cover",
                              }}
                            />
                          )}

                          <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center mb-3">

                              <span
                                className="badge rounded-pill px-3 py-2"
                                style={{
                                  backgroundColor:
                                    "#b78342",
                                }}
                              >
                                {event.year}
                              </span>

                              {event.category
                                ?.name && (
                                <small
                                  className="text-muted"
                                >
                                  {
                                    event
                                      .category
                                      .name
                                  }
                                </small>
                              )}

                            </div>

                            <h4
                              className="fw-bold mb-3"
                              style={{
                                color:
                                  "#101820",
                              }}
                            >
                              {event.title}
                            </h4>

                            <p
                              className="text-muted"
                              style={{
                                lineHeight:
                                  "1.8",
                              }}
                            >
                              {
                                event.description
                              }
                            </p>

                            {event.period && (
                              <p className="mb-1">
                                <strong>
                                  Period:
                                </strong>{" "}
                                {
                                  event.period
                                }
                              </p>
                            )}

                            {event.location && (
                              <p className="mb-0 text-muted">
                                📍{" "}
                                {
                                  event.location
                                }
                              </p>
                            )}

                          </div>
                        </div>
                      </div>

                      {/* Timeline Dot */}
                      <div
                        className="d-none d-md-flex position-absolute align-items-center justify-content-center"
                        style={{
                          left: "50%",
                          top: "25px",
                          width: "22px",
                          height: "22px",
                          borderRadius:
                            "50%",
                          backgroundColor:
                            "#b78342",
                          border:
                            "4px solid #f5f1e8",
                          transform:
                            "translateX(-50%)",
                          zIndex: 2,
                        }}
                      ></div>

                    </div>
                  );
                }
              )}

            </div>
          )}

        {!loading &&
          !error &&
          timeline.length === 0 && (
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
                Timeline Is Empty
              </h4>

              <p className="text-muted">
                Historical timeline events will
                appear here once they are added.
              </p>

            </div>
          )}

      </div>
    </div>
  );
};

export default Timeline;