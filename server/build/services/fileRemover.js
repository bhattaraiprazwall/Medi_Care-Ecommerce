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
exports.removeFile = void 0;
const deleteFileCloudinary_1 = require("../middleware/deleteFileCloudinary ");
const removeFile = (product, filesToDelete) => __awaiter(void 0, void 0, void 0, function* () {
    if (!filesToDelete || filesToDelete.length === 0)
        return;
    const cloudinaryIdsToDelete = [];
    console.log('files name', filesToDelete);
    filesToDelete.forEach((filename) => {
        const match = product.files.find(file => file.filename === filename);
        if (match) {
            product.files.pull(match._id);
            if (match.public_id)
                cloudinaryIdsToDelete.push(match.public_id);
        }
    });
    console.log("deleting file fileremover", cloudinaryIdsToDelete);
    if (cloudinaryIdsToDelete.length > 0) {
        yield (0, deleteFileCloudinary_1.deleteFileCloudinary)(cloudinaryIdsToDelete);
        product.markModified("files");
    }
});
exports.removeFile = removeFile;
