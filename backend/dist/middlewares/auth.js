"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = require("jsonwebtoken");
function authUser(req, res, next) {
    const { token = "" } = req.headers;
    if (!token) {
        return next();
    }
    const payload = (0, jsonwebtoken_1.verify)(token, config_1.default.get("app.jwt.secret"));
    if (payload.user) {
        req.user = payload.user;
    }
    return next();
}
exports.default = authUser;
