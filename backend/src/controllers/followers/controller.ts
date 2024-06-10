import { NextFunction, Request, Response } from "express";
import getModel from "../../models/followers/factory";

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.json(await getModel().getOne(req.params.userId));
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
  return res.json(await getModel().follow(req.body));
};

export const deleteFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.json(
    await getModel().unfollow(req.params.userId, req.params.vacationId)
  );
};
