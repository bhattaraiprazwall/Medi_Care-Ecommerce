"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const private_key = process.env.JWT_PRIVATE_KEY || '';
const expiresIn = (_a = process.env.JWT_EXPIRES_IN) !== null && _a !== void 0 ? _a : "24h";
const generateToken = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, private_key, { expiresIn: expiresIn });
    return token;
};
exports.generateToken = generateToken;
const decode = (token) => {
    const decode = jsonwebtoken_1.default.verify(token, private_key);
    return decode;
};
exports.decode = decode;
