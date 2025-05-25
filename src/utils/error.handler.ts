import { ErrorRequestHandler } from "express";
import { CustomApiError } from "./errors/CustomApiError";
import { MongooseError } from "mongoose";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next): void => {
  let message: string = err.message;
  let statusCode: number = err.statusCode;

  if (err instanceof MongooseError) {
    message =
      err.message ?? "Insert or Update violates unique constraint error";
    statusCode = 422;
    const errorObj = {
      name: err.name,
      message: err.message,
    };
    console.error(JSON.stringify(errorObj));
  } else if (err instanceof CustomApiError) {
    console.error(JSON.stringify(err.message));
  } else if (!statusCode) {
    message = "Something went wrong!";
    statusCode = 500;
    console.error(`Error triggered from erroHandler: ${err.message}`);
  } else {
    message = "Something went wrong";
    statusCode = 500;
    console.error(`Error triggered from erroHandler: ${err.message}`);
  }

  res
    .status(statusCode)
    .json({ success: false, statusCode, message, payload: {} });
};

export default errorHandler;
