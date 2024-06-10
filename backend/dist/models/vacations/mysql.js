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
const uuid_1 = require("uuid");
// [1,2,3,4,5,6,7,8,9]
// limit 2
// page 0
// 0     1     2
// [1,2] [3,4] [5,6]
// /vacation?page=4
const LIMIT = 10;
class vacation {
    getAll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `
    SELECT id,
          destination,
          description,
          startDate,
          endDate,
          price, 
          imageName,
          CASE WHEN (followers.userId = '${params.userId}') THEN 1 ELSE 0 END AS isFollowing,
          COUNT(followers.vacationId) as amountOfFollowers
    FROM vacations
    LEFT JOIN followers ON followers.vacationId = vacations.id
    `;
            const where = [];
            if (params.onlyUser) {
                where.push(`followers.userId = '${params.userId}'`);
            }
            if (params.notStarted) {
                where.push(`startDate>now()`);
            }
            if (params.onlyActive) {
                where.push(`((startDate < now()) and (now() < endDate))`);
            }
            if (where.length > 0) {
                sql += `where ${where.join(" and ")}\n`;
            }
            sql += "GROUP BY vacations.id order by startDate asc\n";
            const allVacations = yield (0, mysql_1.default)(sql);
            if ("page" in params) {
                sql += `limit ${LIMIT} offset ${LIMIT * params.page}`;
            }
            const vacations = yield (0, mysql_1.default)(sql);
            return {
                vacations,
                total: allVacations.length,
                limit: LIMIT,
            };
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const vacations = yield (0, mysql_1.default)(`
        SELECT id,
              destination,
              description,
              startDate,
              endDate,
              price, 
              imageName
        FROM vacations
            WHERE   id = ?
        `, [id]);
            return vacations[0];
        });
    }
    add(vacation) {
        return __awaiter(this, void 0, void 0, function* () {
            const { destination, description, startDate, endDate, price, imageName } = vacation;
            const id = (0, uuid_1.v4)();
            const result = yield (0, mysql_1.default)(`
            INSERT INTO vacations
            (id, destination, description, startDate, endDate, price, imageName) 
            VALUES(?,?,?,?,?,?,?);
        `, [id, destination, description, startDate, endDate, price, imageName]);
            return this.getOne(result.insertId);
        });
    }
    update(vacation) {
        return __awaiter(this, void 0, void 0, function* () {
            const originalVacation = yield this.getOne(vacation.id);
            // merge with new values
            const newVacation = Object.assign(Object.assign({}, originalVacation), vacation);
            const { id, destination, description, startDate, endDate, price, imageName, } = newVacation;
            yield (0, mysql_1.default)(`
            UPDATE  vacations
            SET     destination=?,
                    description=?,
                    startDate=?,
                    endDate=?,
                    price=?,
                    imageName=?
            WHERE   id = ?
        `, [destination, description, startDate, endDate, price, imageName, id]);
            return this.getOne(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, mysql_1.default)(`
            DELETE FROM vacations
            WHERE       id = ?
        `, [id]);
            return Boolean(result.affectedRows);
        });
    }
    count(vacation) {
        return __awaiter(this, void 0, void 0, function* () {
            const vacations = yield (0, mysql_1.default)(`
    SELECT * ,
     COUNT(followers.vacationId)
    FROM vacations
    LEFT JOIN followers ON vacationId= vacations.id
    GROUP BY followers.vacationId;
    `);
            return vacations;
        });
    }
    graph() {
        return __awaiter(this, void 0, void 0, function* () {
            const vacations = yield (0, mysql_1.default)(`
    SELECT vacations.destination,
     COUNT(followers.vacationId) as amount
    FROM vacations
    LEFT JOIN followers ON vacationId= vacations.id
    GROUP BY followers.vacationId
    HAVING COUNT(followers.vacationId) > 0
    `);
            return vacations;
        });
    }
}
const vacations = new vacation();
exports.default = vacations;
