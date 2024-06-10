import config from "config";
import { NextFunction, Request, Response } from "express";
import createHttpError, { Forbidden } from "http-errors";
import { ReasonPhrases } from "http-status-codes";

export default function enforceAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user &&req.user.role!==1) {
    return next(createHttpError(Forbidden(ReasonPhrases.FORBIDDEN)));
  }
  return next();
}
