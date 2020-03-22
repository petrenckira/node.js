
export class HttpError extends Error {
  constructor(public statusCode, public message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class ErrorHandler {
  constructor() {}

  handleError (err, res): void {
    let { statusCode, message } = err;
    statusCode = statusCode ? statusCode: 500;
    message = message ? message: 'Internal server Error';
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message
    });
  }

  //arrow function for avoiding bind
  handleErrorMiddleware = (err, req, res, next) => {
    this.handleError(err, res);
    next();
  }
}

export const errorHandlerInstance = new ErrorHandler();
