const errorMiddleware = (err, req, res, next) => {
  console.log("Error:", err.message);

  const statusCode = res.statusCode === 200
    ? 500
    : res.statusCode;

  res.status(statusCode).json({
    message: err.message || "Something went wrong"
  });
};

module.exports = errorMiddleware;