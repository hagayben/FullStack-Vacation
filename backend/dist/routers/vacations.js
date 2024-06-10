"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controllers/vacations/controller");
const enforce_admin_1 = __importDefault(require("../middlewares/enforce-admin"));
const upload_image_1 = __importDefault(require("../middlewares/upload-image"));
const add_image_to_body_1 = __importDefault(require("../middlewares/add-image-to-body"));
const input_validation_1 = __importDefault(require("../middlewares/input-validation"));
const validator_1 = require("../controllers/vacations/validator");
const router = (0, express_1.Router)();
// /?page=3&onlyUser=true&onlyActive=true&notStarted=false
router.get("/csv", controller_1.sendCSV);
router.get("/", controller_1.getAll);
router.get("/vacation-report", controller_1.graph);
router.get("/:id", enforce_admin_1.default, controller_1.getOne);
router.post("/", add_image_to_body_1.default, (0, input_validation_1.default)(validator_1.addVacationValidator), upload_image_1.default, controller_1.add);
router.patch("/:id", add_image_to_body_1.default, enforce_admin_1.default, (0, input_validation_1.default)(validator_1.patchVacationValidator), upload_image_1.default, controller_1.update);
router.delete("/:id", enforce_admin_1.default, controller_1.deleteVacation);
exports.default = router;
