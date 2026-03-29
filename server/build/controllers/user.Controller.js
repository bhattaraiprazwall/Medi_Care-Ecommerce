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
exports.login = exports.signup = void 0;
const customError_1 = __importDefault(require("../util/customError"));
const responseHandler_1 = __importDefault(require("../util/responseHandler"));
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
const user_model_1 = require("../model/user.model");
const bcrypt_1 = require("../util/bcrypt");
const token_1 = require("../util/token");
exports.signup = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password, email, role } = req.body;
    const hashPassword = yield (0, bcrypt_1.hashPassord)(password);
    const newUser = yield user_model_1.User.create({
        userName,
        password: hashPassword,
        email,
        role
    });
    if (newUser) {
        //send reponse for creating user
        (0, responseHandler_1.default)(201, newUser, res, "signed up successfully");
    }
}));
exports.login = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    const user = yield user_model_1.User.findOne({ email });
    if (user) {
        //compare password hashed
        const isPasswordValid = yield (0, bcrypt_1.comparePassword)(password, user.password);
        if (isPasswordValid) {
            //generate token and send
            const payload = {
                _id: user._id,
                username: user.userName,
                email: user.email,
                role: user.role,
                number: (_a = user.phoneNumber) !== null && _a !== void 0 ? _a : ''
            };
            const token = (0, token_1.generateToken)(payload);
            (0, responseHandler_1.default)(200, user, res, 'logged in successfully', token);
        }
        else {
            throw new customError_1.default(401, "Authentication error Invalid email password");
        }
    }
    else {
        throw new customError_1.default(401, "Authentication error Invalid email password");
    }
}));
