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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavouriteProducts = exports.getMostedlikedProducts = exports.getMostedBuyedProducts = exports.getLatestProducts = exports.singleProduct = exports.products = exports.deleteProduct = exports.updateProduct = exports.product = void 0;
const deleteFileCloudinary_1 = require("../middleware/deleteFileCloudinary ");
const product_model_1 = require("../model/product.model");
const fileRemover_1 = require("../services/fileRemover");
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
const customError_1 = __importDefault(require("../util/customError"));
const mapUploadFiles_1 = __importDefault(require("../util/mapUploadFiles"));
const responseHandler_1 = __importDefault(require("../util/responseHandler"));
//add product
exports.product = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = __rest(req.body, []);
    const files = req.files;
    if (!files) {
        throw new customError_1.default(404, "product image required");
    }
    const product = yield product_model_1.Product.findOne({ name: body.name });
    if (product) {
        throw new customError_1.default(400, "product already exists");
    }
    console.log("controller", files);
    const newProduct = new product_model_1.Product(body);
    if (files && (files === null || files === void 0 ? void 0 : files.length) > 0) {
        const mappedFile = (0, mapUploadFiles_1.default)(files);
        console.log("mappedfile", mappedFile);
        newProduct.files.push(...mappedFile);
    }
    const data = yield newProduct.save();
    if (data) {
        (0, responseHandler_1.default)(201, data, res, "Product added successfully");
    }
}));
//update product
exports.updateProduct = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { deletedFiles } = _a, body = __rest(_a, ["deletedFiles"]);
    const { id } = req.params;
    const files = req.files;
    console.log("files", files);
    const product = yield product_model_1.Product.findOne({ _id: id });
    if (!product) {
        throw new customError_1.default(404, "product not found");
    }
    if (deletedFiles && deletedFiles.length > 0) {
        const filesToDelete = JSON.parse(deletedFiles);
        // console.log(filesToDelete)
        filesToDelete.forEach((filesToDelete) => {
            const match = product.files.find(r => r.filename === filesToDelete);
            if (match)
                product.files.pull(match._id);
        });
        yield (0, deleteFileCloudinary_1.deleteFileCloudinary)(filesToDelete);
    }
    if (files && (files === null || files === void 0 ? void 0 : files.length) > 0) {
        files.forEach((file) => product.files.push({
            filename: file.filename,
            originalname: file.originalname,
            public_id: file.path,
            url: file.path,
        }));
    }
    Object.assign(product, body);
    const data = yield product.save();
    if (data) {
        (0, responseHandler_1.default)(201, data, res, "Product updated successfully");
    }
}));
//delete product
exports.deleteProduct = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("id", id);
    const product = yield product_model_1.Product.findById(id);
    const allFilenames = product.files.map(file => file.public_id);
    if (!product) {
        throw new customError_1.default(404, "Product not found");
    }
    // Delete associated files from Cloudinary and Mongo array
    yield (0, fileRemover_1.removeFile)(product, allFilenames);
    // Delete the product itself
    yield product_model_1.Product.findByIdAndDelete({ _id: id.toString() });
    return (0, responseHandler_1.default)(200, null, res, "Product deleted successfully");
}));
//getAll product
exports.products = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield product_model_1.Product.find();
    return (0, responseHandler_1.default)(200, data, res, "All products successfully");
}));
//getSingle product
exports.singleProduct = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productID } = req.params;
    const data = yield product_model_1.Product.findOne({ _id: productID });
    if (!data) {
        throw new customError_1.default(404, 'Not found');
    }
    return (0, responseHandler_1.default)(200, data, res, "All products successfully");
}));
//getLatest product
exports.getLatestProducts = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield product_model_1.Product.find().sort({ createdAt: -1 }).limit(10);
    return (0, responseHandler_1.default)(200, data, res, "Latest product fetche");
}));
//getLatest product
exports.getMostedBuyedProducts = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield product_model_1.Product.find().sort({ buyInfo: -1 }).limit(10);
    return (0, responseHandler_1.default)(200, data, res, "MostBuyed product fetche");
}));
exports.getMostedlikedProducts = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield product_model_1.Product.find().sort({ likes: -1 }).limit(10);
    return (0, responseHandler_1.default)(200, data, res, "MostBuyed product fetche");
}));
//getLatest product
exports.getFavouriteProducts = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield product_model_1.Product.find().sort({ likes: -1 }).limit(10);
    return (0, responseHandler_1.default)(200, data, res, "Favourite product fetche");
}));
