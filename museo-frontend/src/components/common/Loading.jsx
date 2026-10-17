import React from "react";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div
      className="d-flex flex-column justify-content-center
      align-items-center py-5"
      style={{
        minHeight: "250px"
      }}
    >

      {/* Spinner */}
      <div
        className="spinner-border"
        role="status"
        style={{
          color: "#b78342",
          width: "45px",
          height: "45px"
        }}
      >
        <span className="visually-hidden">
          Loading...
        </span>
      </div>

      {/* Message */}
      <p className="text-secondary mt-3 mb-0">
        {message}
      </p>

    </div>
  );
};

export default Loading;

