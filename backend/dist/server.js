"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./utils/logger"));
app_1.default.listen(config_1.default.get("app.port"), () => {
    logger_1.default.info(`${config_1.default.get("app.name")} is running on localhost:${config_1.default.get("app.port")}`);
});
