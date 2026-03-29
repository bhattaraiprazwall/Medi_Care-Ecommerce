"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapUploadFile = (files) => {
    return (files.map((file) => ({
        filename: file.filename,
        public_id: file.filename,
        originalname: file.originalname,
        url: file.path
    })));
};
exports.default = mapUploadFile;
