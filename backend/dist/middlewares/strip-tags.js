"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const striptags_1 = __importDefault(require("striptags"));
function stripTags(request, res, next) {
    const entries = Object.entries(request.body);
    const stripped = entries.map(([key, value]) => [
        key,
        (0, striptags_1.default)(value),
    ]);
    request.body = Object.fromEntries(stripped);
    next();
}
exports.default = stripTags;
