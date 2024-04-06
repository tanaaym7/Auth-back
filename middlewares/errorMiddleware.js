const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message= err.extraDetail || "Error from the Backend";

  console.error(
    `[${req.method}] @ ${req.path} >> StatusCode:: ${status}, Message:: ${message} `
  );

  return res.status(status).json({  message });
};

module.exports = errorMiddleware;