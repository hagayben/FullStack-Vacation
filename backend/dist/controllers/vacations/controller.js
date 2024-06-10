"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graph = exports.sendCSV = exports.deleteVacation = exports.update = exports.add = exports.getOne = exports.getAll = void 0;
const factory_1 = __importDefault(require("../../models/vacations/factory"));
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("config"));
const json_2_csv_1 = require("json-2-csv");
function convertVacationToImageUrl(vacation) {
    const vacationWithImageUrl = Object.assign(Object.assign({}, vacation), { imageUrl: `${config_1.default.get("app.protocol")}://${config_1.default.get("app.host")}:${config_1.default.get("app.port")}/images/${vacation.imageName}` });
    delete vacationWithImageUrl.imageName;
    return vacationWithImageUrl;
}
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, onlyUser, onlyActive, notStarted } = req.query;
    const params = {
        userId: req.user.id,
        onlyUser: Boolean(onlyUser) || false,
        onlyActive: Boolean(onlyActive) || false,
        notStarted: Boolean(notStarted) || false,
    };
    if (page) {
        params["page"] = parseInt(page) || 0;
    }
    return res.json(yield (0, factory_1.default)().getAll(params));
});
exports.getAll = getAll;
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vacation = yield (0, factory_1.default)().getOne(req.params.id);
        if (!vacation)
            return next();
        res.json(convertVacationToImageUrl(vacation));
    }
    catch (err) {
        next(err);
    }
});
exports.getOne = getOne;
const add = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vacation = yield (0, factory_1.default)().add(req.body);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(convertVacationToImageUrl(vacation));
    }
    catch (err) {
        next(err);
    }
    // return res.json(await getModel().add(req.body));
});
exports.add = add;
// export const update = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   return res.json(await getModel().update(req.params.id, req.body));
// };
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedVacation = Object.assign({ id }, req.body);
        const vacation = yield (0, factory_1.default)().update(updatedVacation);
        res.json(convertVacationToImageUrl(vacation));
    }
    catch (err) {
        next(err);
    }
});
exports.update = update;
const deleteVacation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json(yield (0, factory_1.default)().delete(req.params.id));
});
exports.deleteVacation = deleteVacation;
const sendCSV = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vacation = yield (0, factory_1.default)().graph();
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=vacations.csv");
        const csv = yield (0, json_2_csv_1.json2csv)(vacation, {});
        res.send(csv);
    }
    catch (err) {
        next(err);
    }
});
exports.sendCSV = sendCSV;
const graph = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vacation = yield (0, factory_1.default)().graph();
        if (!vacation)
            return next();
        res.json(vacation);
    }
    catch (err) {
        next(err);
    }
});
exports.graph = graph;
