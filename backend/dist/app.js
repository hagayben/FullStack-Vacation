"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routers/auth"));
const vacations_1 = __importDefault(require("./routers/vacations"));
const followers_1 = __importDefault(require("./routers/followers"));
const config_1 = __importDefault(require("config"));
const not_found_1 = require("./middlewares/not-found");
const error_handler_1 = require("./middlewares/error-handler");
const cors_1 = __importDefault(require("cors"));
const auth_2 = __importDefault(require("./middlewares/auth"));
const enforce_guest_1 = __importDefault(require("./middlewares/enforce-guest"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
const strip_tags_1 = __importDefault(require("./middlewares/strip-tags"));
const limiter_1 = require("./middlewares/limiter");
const server = (0, express_1.default)();
server.use(limiter_1.limiter);
server.use((0, cors_1.default)({
// origin:'localhost:3000'
}));
server.use(express_1.default.json());
server.use(strip_tags_1.default);
server.use((0, express_fileupload_1.default)());
server.use("/api", auth_2.default);
server.use("/api/auth", auth_1.default);
server.use("/api/vacations", enforce_guest_1.default, vacations_1.default);
server.use("/api/followers", enforce_guest_1.default, followers_1.default);
server.use("/images", express_1.default.static(path_1.default.resolve(config_1.default.get("app.images.path"))));
// special middleware for not found error
server.use(not_found_1.notFound);
// error middlewares
server.use(error_handler_1.errorHandler);
exports.default = server;
