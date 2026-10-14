// Runs when no route matched the request.
function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

// Runs when any route throws an error. Express knows this is an error
// handler because it has 4 parameters (err, req, res, next).
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // Errors like invalid JSON already carry a 4xx status; everything else is a 500.
  const status = err.status || 500;

  if (status >= 500) {
    console.error(err);
  }

  let message = err.message;
  if (err.type === 'entity.parse.failed') {
    message = 'Request body is not valid JSON';
  }
  if (status >= 500) {
    message = 'Something went wrong on the server';
  }

  res.status(status).json({ message });
}

module.exports = { notFound, errorHandler };
