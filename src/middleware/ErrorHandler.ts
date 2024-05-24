import { type Request, type Response, type NextFunction } from "express";
import customerLogger from "../log/logger";

//todo: if statusCode is (400-499) the level is bug error  or statusCode >= 500 is server error level error
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

const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  customerLogger.log("error", error);
  return res.status(error.statusCode).json({
    errors: [
      {
        message: "Something went wrong. Try again later.",
        type: "sever Error",
        path: null,
        value: null,
      },
    ],
  });
};

export default errorHandler;
