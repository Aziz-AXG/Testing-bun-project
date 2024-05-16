import { type Request, type Response } from "express";
import { CustomError } from "../middleware/ErrorHandler";

export const resignation = async (req: Request, res: Response) => {
  // throw new CustomError("Could not connect to the DB", 500, "DB_ERROR");
  res.status(200).json({ message: req.body });

  //? Simulating a DB Crash error by throwing an error
};
