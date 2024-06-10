"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = exports.hashPassword = void 0;
const crypto_1 = require("crypto");
const jsonwebtoken_1 = require("jsonwebtoken");
function hashPassword(plainTextPassword, salt) {
    return (0, crypto_1.createHmac)('md5', salt)
        .update(`${plainTextPassword}`)
        .digest('hex');
}
exports.hashPassword = hashPassword;
function generateJWT(user, secret, expiresIn) {
    return (0, jsonwebtoken_1.sign)({ user }, secret, { expiresIn });
}
exports.generateJWT = generateJWT;
