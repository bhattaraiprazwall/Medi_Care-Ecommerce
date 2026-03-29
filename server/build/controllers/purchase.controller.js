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
exports.deleteHistory = exports.purchaseHistory = exports.purchase = void 0;
const product_model_1 = require("../model/product.model");
const purchaseHistory_model_1 = require("../model/purchaseHistory.model");
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
const customError_1 = __importDefault(require("../util/customError"));
const responseHandler_1 = __importDefault(require("../util/responseHandler"));
exports.purchase = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("request came here");
    const purchaseData = req.body;
    const { _id } = req.user;
    const { productID } = req.params;
    const product = yield product_model_1.Product.findById({ _id: productID.toString() });
    if (!product) {
        new customError_1.default(404, "Product not found");
    }
    const buyRequest = new purchaseHistory_model_1.Purchase(Object.assign(Object.assign({}, purchaseData), { product: productID, user: _id }));
    yield buyRequest.save();
    (0, responseHandler_1.default)(201, buyRequest, res, "Your purchase request hase been made");
}));
exports.purchaseHistory = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    const data = yield purchaseHistory_model_1.Purchase.find({ user: user }).populate('product');
    (0, responseHandler_1.default)(200, data, res, "Your purchase history");
}));
exports.deleteHistory = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user._id;
    console.log("id", id);
    const wishlist = yield purchaseHistory_model_1.Purchase.findById({ _id: id.toString() });
    if (!wishlist) {
        throw new customError_1.default(404, "History not found");
    }
    if (!wishlist.user.equals(user)) {
        throw new customError_1.default(403, "unauthorized access denied");
    }
    yield purchaseHistory_model_1.Purchase.findByIdAndDelete({ _id: id.toString() });
    return (0, responseHandler_1.default)(200, null, res, "Removed from wishlist");
}));
