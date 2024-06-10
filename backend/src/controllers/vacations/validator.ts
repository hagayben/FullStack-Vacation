import Joi from "joi";
import DTO from "../../models/vacations/vacation-dto";

export const addVacationValidator = Joi.object<DTO>({
  id: Joi.string().optional(),
  destination: Joi.string().alphanum().min(4).lowercase().required(),
  description: Joi.string().alphanum().min(4).lowercase().required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().greater(Joi.ref("startDate")).required(),
  price: Joi.number().min(1).max(10000).required(),
  image: Joi.object({
    mimetype: Joi.string().valid("image/jpg", "image/jpeg", "image/png"),
  })
    .unknown(true)
    .optional(),
});


export const patchVacationValidator = Joi.object<DTO>({
    id: Joi.string().optional(),
    destination: Joi.string().alphanum().min(4).lowercase(),
    description: Joi.string().alphanum().min(4).lowercase(),
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso().greater(Joi.ref("startDate")),
    price: Joi.number().min(1).max(10000),
    image: Joi.object({
      mimetype: Joi.string().valid("image/jpg", "image/jpeg", "image/png"),
    })
      .unknown(true)
      .optional(),
  });