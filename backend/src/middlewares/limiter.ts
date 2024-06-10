import { NextFunction, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import config from "config";

export const limiter = rateLimit({
  windowMs: config.get<number>("app.limiter.windowMs"),
  limit: config.get<number>("app.limiter.limit"),
  standardHeaders: "draft-7",
  legacyHeaders: false, 
});
