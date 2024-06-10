"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../utils/logger"));
const notFound = (req, res, next) => {
    logger_1.default.error('not found on ' + req.originalUrl);
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(http_status_codes_1.ReasonPhrases.NOT_FOUND);
};
exports.notFound = notFound;
