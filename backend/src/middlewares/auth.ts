import config from "config";
import { NextFunction, Request, Response } from "express";
import createHttpError, { Forbidden } from "http-errors";
import { ReasonPhrases } from "http-status-codes";
import { verify, JwtPayload } from "jsonwebtoken";

export default function authUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token = "" } = req.headers;
  if (!token) {
    return next();
  }
  const payload = verify(
    token as string,
    config.get<string>("app.jwt.secret")
  ) as JwtPayload;
  if (payload.user) {
    req.user = payload.user;
  }
  return next();
}
