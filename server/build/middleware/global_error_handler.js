"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalError = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    const msg = {
        message: err.message || "internal server error",
        status: err.status || "fail",
        statusCode,
        success: err.success || false
    };
    res.status(statusCode).json(msg);
};
exports.default = globalError;
