"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controllers/followers/controller");
const enforce_user_1 = __importDefault(require("../middlewares/enforce-user"));
const router = (0, express_1.Router)();
router.use(enforce_user_1.default);
router.post("/", controller_1.add);
router.delete("/:userId/:vacationId", controller_1.deleteFollow);
exports.default = router;
