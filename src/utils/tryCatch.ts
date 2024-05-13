import { type Request, type Response, type NextFunction } from "express";

const tryCatch =
  (controller: (req: Request, res: Response) => any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };

export default tryCatch;
