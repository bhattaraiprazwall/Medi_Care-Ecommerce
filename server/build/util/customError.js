"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class customError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        this.isOperation = true;
        Error.captureStackTrace(this, customError);
    }
}
exports.default = customError;
