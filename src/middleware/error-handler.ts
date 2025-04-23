import { ErrorRequestHandler, Express } from "express";

/**
 * The default express error handler will log messages (in non-json format), so using expressWinston to log them instead
 */
const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  res.status(err.statusCode ?? 500);

  const errorResponse: { [key: string]: any } = {};

  if (err.type) {
    errorResponse.type = err.type;
  }

  res.send(errorResponse);

  next();
};

export const configureErrorHandler = (server: Express) => {
  server.use(errorHandler);
};
