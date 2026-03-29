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
exports.comparePassword = exports.hashPassord = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPassord = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcryptjs_1.default.genSalt(6);
        const hashed = yield bcryptjs_1.default.hash(password, salt);
        return hashed;
    }
    catch (error) {
        throw error;
    }
});
exports.hashPassord = hashPassord;
const comparePassword = (password, hashPassord) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const compare = yield bcryptjs_1.default.compare(password, hashPassord);
        return compare;
    }
    catch (error) {
        throw error;
    }
});
exports.comparePassword = comparePassword;
