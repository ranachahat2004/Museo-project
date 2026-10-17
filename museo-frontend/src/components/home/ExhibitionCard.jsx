import React from "react";

const ExhibitionCard = ({ exhibition, onView }) => {

  // Safety check
  if (!exhibition) {
    return null;
  }

  const {
    image,
    title,
    period,
    description,
    status,
    category,
    location,
    startDate,
    endDate,
  } = exhibition;


  // Format date safely
  const formatDate = (date) => {

    if (!date) {
      return "";
    }

    const formattedDate =
      new Date(date);

    if (isNaN(formattedDate.getTime())) {
      return "";
    }

    return formattedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  // Status badge
  const getStatusClass = () => {

    if (status === "Ongoing") {
      return "bg-success";
    }

    if (status === "Upcoming") {
      return "bg-primary";
    }

    if (status === "Completed") {
      return "bg-secondary";
    }

    return "bg-dark";
  };


  return (
    <div className="card border-0 shadow-sm h-100 overflow-hidden">

      {/* =========================
          IMAGE
      ========================== */}

      <div
        style={{
          height: "250px",
          overflow: "hidden",
          backgroundColor: "#f1f1f1",
        }}
      >

        {image ? (

          <img
            src={image}
            alt={
              title ||
              "MUSEO Exhibition"
            }
            className="w-100 h-100"
            style={{
              objectFit: "cover",
            }}
          />

        ) : (

          <div
            className="w-100 h-100 d-flex align-items-center justify-content-center bg-dark text-white"
          >

            <div className="text-center">

              <h4 className="fw-bold mb-1">
                MUSEO
              </h4>

              <small>
                Exhibition
              </small>

            </div>

          </div>

        )}

      </div>


      {/* =========================
          CARD BODY
      ========================== */}

      <div className="card-body p-4 d-flex flex-column">


        {/* TITLE + STATUS */}

        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">

          <h4 className="card-title fw-bold mb-0">

            {title ||
              "Untitled Exhibition"}

          </h4>


          {status && (

            <span
              className={`badge ${getStatusClass()}`}
            >
              {status}
            </span>

          )}

        </div>


        {/* PERIOD */}

        {period && (

          <p
            className="mb-2 fw-semibold"
            style={{
              color: "#a67c52",
            }}
          >
            {period}
          </p>

        )}


        {/* CATEGORY */}

        {category && (

          <div className="mb-2">

            <span className="badge bg-light text-dark border">

              {typeof category === "object"
                ? category.name
                : category}

            </span>

          </div>

        )}


        {/* DESCRIPTION */}

        {description && (

          <p className="text-muted mb-3">

            {description.length > 120
              ? `${description.substring(
                  0,
                  120
                )}...`
              : description}

          </p>

        )}


        {/* LOCATION */}

        {location && (

          <p className="small text-muted mb-2">

            <strong>
              Location:
            </strong>{" "}

            {location}

          </p>

        )}


        {/* DATES */}

        {startDate && endDate && (

          <p className="small text-muted mb-3">

            <strong>
              Date:
            </strong>{" "}

            {formatDate(startDate)}

            {" - "}

            {formatDate(endDate)}

          </p>

        )}


        {/* BUTTON */}

        <div className="mt-auto pt-2">

          <button
            type="button"
            className="btn btn-outline-dark w-100"
            onClick={() => {

              if (onView) {
                onView(exhibition);
              }

            }}
          >

            View Exhibition

          </button>

        </div>

      </div>

    </div>
  );
};


export default ExhibitionCard;