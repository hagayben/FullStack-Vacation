import { NextFunction, Request, Response } from "express";
import getModel from "../../models/vacations/factory";
import { StatusCodes } from "http-status-codes";
import VacationDTO from "../../models/vacations/vacation-dto";
import config from "config";
import { json2csv } from "json-2-csv";

function convertVacationToImageUrl(vacation: VacationDTO) {
  const vacationWithImageUrl = {
    ...vacation,
    imageUrl: `${config.get<string>("app.protocol")}://${config.get<string>(
      "app.host"
    )}:${config.get<number>("app.port")}/images/${vacation.imageName}`,
  };
  delete vacationWithImageUrl.imageName;
  return vacationWithImageUrl;
}

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, onlyUser, onlyActive, notStarted } = req.query;
  const params = {
    userId: req.user.id,
    onlyUser: Boolean(onlyUser) || false,
    onlyActive: Boolean(onlyActive) || false,
    notStarted: Boolean(notStarted) || false,
  };
  if (page) {
    params["page"] = parseInt(page as string) || 0;
  }

  return res.json(await getModel().getAll(params));
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vacation = await getModel().getOne(req.params.id);
    if (!vacation) return next();
    res.json(convertVacationToImageUrl(vacation));
  } catch (err) {
    next(err);
  }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vacation = await getModel().add(req.body);
    res.status(StatusCodes.CREATED).json(convertVacationToImageUrl(vacation));
  } catch (err) {
    next(err);
  }
  // return res.json(await getModel().add(req.body));
};

// export const update = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   return res.json(await getModel().update(req.params.id, req.body));
// };
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const updatedVacation = { id, ...req.body };
    const vacation = await getModel().update(updatedVacation);
    res.json(convertVacationToImageUrl(vacation));
  } catch (err) {
    next(err);
  }
};

export const deleteVacation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.json(await getModel().delete(req.params.id));
};

export const sendCSV = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vacation = await getModel().graph();

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=vacations.csv");
    const csv = await json2csv(vacation as unknown as object[], {});
    res.send(csv);
  } catch (err) {
    next(err);
  }
};

export const graph = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vacation = await getModel().graph();
    if (!vacation) return next();
    res.json(vacation);
  } catch (err) {
    next(err);
  }
};
