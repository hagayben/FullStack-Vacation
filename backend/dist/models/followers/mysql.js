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
const mysql_1 = __importDefault(require("../../db/mysql"));
class Follow {
    getOne(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const follow = yield (0, mysql_1.default)(`
        SELECT userId,
              vacationId
        FROM followers
            WHERE   userId = ?
        `, [userId]);
            return follow[0];
        });
    }
    follow(follow) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, vacationId } = follow;
            const result = yield (0, mysql_1.default)(`
            INSERT INTO followers
            (userId, vacationId) 
            VALUES(?,?);
        `, [userId, vacationId]);
            return this.getOne(userId);
        });
    }
    unfollow(userId, vacationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, mysql_1.default)(`
            DELETE FROM followers
            WHERE  userId = ? and vacationId = ?
        `, [userId, vacationId]);
            return Boolean(result.affectedRows);
        });
    }
}
const follow = new Follow();
exports.default = follow;
