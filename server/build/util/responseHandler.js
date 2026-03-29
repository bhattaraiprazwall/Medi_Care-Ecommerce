"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const successMsG = (statusCode, data, res, ms, token) => {
    let code = statusCode || 200;
    let message = ms !== null && ms !== void 0 ? ms : 'opertaion succesfull';
    const msg = {
        message,
        status: 'success',
        data,
        success: true,
        token
    };
    res.status(code).json(msg);
};
exports.default = successMsG;
