import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import logger from '../config/logger';

type CustomError = {
  statusCode?: number;
  status?: number;
  message?: string;
  stack?: string;
  isOperational?: boolean;
} & Error;

const errorConverter = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error instanceof SyntaxError ? 400 : error.status || 500;
    const message = error.message || 'Error';
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err;
  if (!err.isOperational) {
    statusCode = 500;
    message = 'Internal Server Error';
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    // ONLY FOR DEVELOPMENT
    ...{ stack: err.stack },
  };

  // ONLY FOR DEVELOPMENT
  logger.error(err);

  if (!statusCode) statusCode = 500;
  return res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
