import type { NextFunction, Request, Response } from "express";
import customerLogger from "../log/logger";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class CustomError extends Error {
  statusCode: number;
  errorCode: string;

  constructor(message: string, statusCode: number, errorCode: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, CustomError);
  }
}

export class AppError extends Error {
  type: string;
  statusCode: number;
  path: string;
  value: string | null;

  constructor(
    message: string,
    type: string,
    statusCode: number,
    path: string,
    value: string | null
  ) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.path = path;
    this.value = value;
    Error.captureStackTrace(this, AppError);
  }
}
const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);

  if (error instanceof PrismaClientKnownRequestError) {
    return res.status(400).json({
      errors: [
        {
          message: error.message,
          type: "Prisma Error",
          path: req.path,
          value: error.meta?.target,
        },
      ],
    });
  }
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      errors: [
        {
          message: error.message,
          type: error.type,
          path: error.path,
          value: error.value,
        },
      ],
    });
  }
  if (error instanceof CustomError) {
    customerLogger.log("error", error);
    return res.status(error.statusCode || 400).json({
      errors: [
        {
          message: error.message,
          type: "server Error",
          path: null,
          value: null,
        },
      ],
    });
  }
  return (
    customerLogger.log("error", error),
    res.status(500).json({
      errors: [
        {
          message: "Something went wrong. Try again later.",
          type: "server Error",
          path: null,
          value: null,
        },
      ],
    })
  );
};

export default errorHandler;
