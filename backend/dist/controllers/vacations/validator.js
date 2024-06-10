"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchVacationValidator = exports.addVacationValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addVacationValidator = joi_1.default.object({
    id: joi_1.default.string().optional(),
    destination: joi_1.default.string().min(4).lowercase().required(),
    description: joi_1.default.string().min(4).lowercase().required(),
    startDate: joi_1.default.date().iso().required(),
    endDate: joi_1.default.date().iso().greater(joi_1.default.ref("startDate")).required(),
    price: joi_1.default.number().min(1).max(10000).required(),
    image: joi_1.default.object({
        mimetype: joi_1.default.string().valid("image/jpg", "image/jpeg", "image/png"),
    })
        .unknown(true)
        .optional(),
});
exports.patchVacationValidator = joi_1.default.object({
    id: joi_1.default.string().optional(),
    destination: joi_1.default.string().min(4).lowercase(),
    description: joi_1.default.string().min(4).lowercase(),
    startDate: joi_1.default.date().iso(),
    endDate: joi_1.default.date().iso().greater(joi_1.default.ref("startDate")),
    price: joi_1.default.number().min(1).max(10000),
    image: joi_1.default.object({
        mimetype: joi_1.default.string().valid("image/jpg", "image/jpeg", "image/png"),
    })
        .unknown(true)
        .optional(),
});
