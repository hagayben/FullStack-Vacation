"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../utils/logger"));
const errorHandler = (err, req, res, next) => {
    /*
    {
        status: 400,
        message: 'something is wrong with the input'
    }
    */
    logger_1.default.error(err.message);
    let message;
    if (process.env.NODE_ENV === 'production') {
        message = 'Something is wrong...';
    }
    else {
        message = err.message;
    }
    res.status(err.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send(message || http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR);
};
exports.errorHandler = errorHandler;
