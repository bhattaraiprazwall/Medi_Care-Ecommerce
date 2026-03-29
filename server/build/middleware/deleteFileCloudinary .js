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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileCloudinary = void 0;
const cloudinary_1 = require("cloudinary"); // Use v2 consistently
const deleteFileCloudinary = (files) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("deleting file", files);
    try {
        const filesArray = Array.isArray(files) ? files : [files];
        const result = yield cloudinary_1.v2.api.delete_resources(filesArray);
        console.log("Deleted from Cloudinary:", result);
        return result;
    }
    catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        throw error;
    }
});
exports.deleteFileCloudinary = deleteFileCloudinary;
