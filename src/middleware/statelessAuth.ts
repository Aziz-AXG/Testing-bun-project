import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./ErrorHandler";
import { publicKey } from "../utils/jwtKeys";
import customerLogger from "../log/logger";
import type { JwtPayload } from "../@types/JwtPayload";

export const statelessAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError(
        req.t("authorizationIsRequired"),
        "Unauthorized",
        401,
        req.path,
        null
      );
    }

    const token = authorization.split(" ")[1];

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, publicKey, {
        algorithms: ["RS256"],
      }) as JwtPayload;
    } catch (error) {
      throw new AppError(
        req.t("invalidToken"),
        "Unauthorized",
        400,
        req.path,
        token
      );
    }
    req.user = decodedToken;

    next();
  } catch (error) {
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
    return (
      customerLogger.log("error", error),
      res.status(500).json({
        errors: [
          {
            message: "Something went wrong. Try again later.",
            type: "server Error",
            path: req.path,
            value: null,
          },
        ],
      })
    );
  }
};
