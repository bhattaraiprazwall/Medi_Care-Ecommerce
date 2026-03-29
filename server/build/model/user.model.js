"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../types/enum");
const userSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    phoneNumber: {
        type: Number,
        minlength: [10, 'Enter valid number'],
        maxlength: [10, 'Enter valid number']
    },
    role: {
        type: String,
        enum: Object.values(enum_1.Role),
        default: enum_1.Role.user
    }
}, {
    timestamps: true
});
exports.User = mongoose_1.default.model('User', userSchema);
