"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
const express_rate_limit_1 = require("express-rate-limit");
const config_1 = __importDefault(require("config"));
exports.limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: config_1.default.get("app.limiter.windowMs"),
    limit: config_1.default.get("app.limiter.limit"),
    standardHeaders: "draft-7",
    legacyHeaders: false,
});
