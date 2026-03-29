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
const customError_1 = __importDefault(require("../util/customError"));
const token_1 = require("../util/token");
const user_model_1 = require("../model/user.model");
const auth = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //check whether the header contains authentication token or not
            const auth_header = req.headers.authorization;
            // console.log("token", auth_header)
            if (!auth_header) {
                throw new customError_1.default(401, "unauthorized access denied");
            }
            //check the format of token that we have created
            // like bearer token
            if (!(auth_header === null || auth_header === void 0 ? void 0 : auth_header.startsWith('Bearer'))) {
                throw new customError_1.default(401, "unauthorized access denied");
            }
            const token = auth_header.split(' ')[1];
            if (!token) {
                throw new customError_1.default(401, "unauthorized access denied");
            }
            //verify token
            const decoded = (0, token_1.decode)(token);
            // console.log("decode", decoded._id)
            //check the expiry of token
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                throw new customError_1.default(401, 'Access token expired , access denied');
            }
            //check whether the user exists or not
            const user = yield user_model_1.User.findOne({ _id: decoded._id });
            // console.log("user", user)
            if (!user) {
                throw new customError_1.default(401, "unauthorized access denied");
            }
            if (!(roles === null || roles === void 0 ? void 0 : roles.includes(user.role))) {
                throw new customError_1.default(401, "unauthorixed access denied");
            }
            //Assign user details in request header to make it reusable
            req.user = {
                _id: user._id,
                username: user.userName,
                email: user.email,
                role: user.role,
                number: user.phoneNumber || ''
            };
            //pass middle ware
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = auth;
