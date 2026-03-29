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
exports.deletefromcart = exports.deletefromwishlist = exports.getCart = exports.getWishlist = exports.del = exports.cart = exports.createWishlist = void 0;
const wishlist_model_1 = require("../model/wishlist.model");
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
const enum_1 = require("../types/enum");
const responseHandler_1 = __importDefault(require("../util/responseHandler"));
const customError_1 = __importDefault(require("../util/customError"));
const product_model_1 = require("../model/product.model");
exports.createWishlist = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user._id;
    const product = yield product_model_1.Product.findById({ _id: id });
    if (!product) {
        throw new customError_1.default(404, "Product not found");
    }
    const existing = yield wishlist_model_1.Wishlist.findOne({
        product: id,
        user: user,
        wishlistType: enum_1.IWishlist.wishlist
    });
    if (existing) {
        throw new customError_1.default(409, "Product already in wishlist");
    }
    const newWishlist = new wishlist_model_1.Wishlist({
        product: id,
        user: user,
        wishlistType: enum_1.IWishlist.wishlist
    });
    const data = yield newWishlist.save();
    return (0, responseHandler_1.default)(201, data, res, "Added in whislist");
}));
exports.cart = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user._id;
    const product = yield product_model_1.Product.findById({ _id: id });
    if (!product) {
        throw new customError_1.default(404, "Product not found");
    }
    const existing = yield wishlist_model_1.Wishlist.findOne({
        product: id,
        user: user,
        wishlistType: enum_1.IWishlist.cart
    });
    if (existing) {
        throw new customError_1.default(409, "Product already in Cart");
    }
    const cart = new wishlist_model_1.Wishlist({
        product: id,
        user: user,
        wishlistType: enum_1.IWishlist.cart
    });
    const data = yield cart.save();
    return (0, responseHandler_1.default)(201, data, res, "Added in Cart");
}));
exports.del = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; //wishlistID
    const user = req.user._id;
    const wishlist = yield wishlist_model_1.Wishlist.findOne({ _id: id });
    if (!wishlist) {
        throw new customError_1.default(404, "Product not found ");
    }
    if (!wishlist.user.equals(user)) {
        throw new customError_1.default(403, "Not authorized to delete this wishlist item");
    }
    const data = yield wishlist_model_1.Wishlist.findByIdAndDelete({ _id: id });
    return (0, responseHandler_1.default)(200, data, res, "Deleted successfully");
}));
exports.getWishlist = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.user._id;
    const data = yield wishlist_model_1.Wishlist.find({
        user: userID,
        wishlistType: enum_1.IWishlist.wishlist
    }).populate('product');
    if (data.length > 0) {
        return (0, responseHandler_1.default)(200, data, res, "User Wishlist Fetched");
    }
    return (0, responseHandler_1.default)(200, data, res, "User Wishlist Empty");
}));
exports.getCart = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.user._id;
    const data = yield wishlist_model_1.Wishlist.find({
        user: userID,
        wishlistType: enum_1.IWishlist.cart
    }).populate('product');
    if (data.length > 0) {
        return (0, responseHandler_1.default)(200, data, res, "User Cart Fetched");
    }
    return (0, responseHandler_1.default)(200, data, res, "User Cart Empty");
}));
exports.deletefromwishlist = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user._id;
    console.log("id", id);
    const wishlist = yield wishlist_model_1.Wishlist.findById({ _id: id.toString() });
    if (!wishlist) {
        throw new customError_1.default(404, "Wishlist not found");
    }
    if (!wishlist.user.equals(user)) {
        throw new customError_1.default(403, "unauthorized access denied");
    }
    yield wishlist_model_1.Wishlist.findByIdAndDelete({ _id: id.toString() });
    return (0, responseHandler_1.default)(200, null, res, "Removed from wishlist");
}));
exports.deletefromcart = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user._id;
    console.log("id", id);
    const wishlist = yield wishlist_model_1.Wishlist.findById({ _id: id.toString() });
    if (!wishlist) {
        throw new customError_1.default(404, "Cart item not found");
    }
    if (!wishlist.user.equals(user)) {
        throw new customError_1.default(403, "unauthorized access denied");
    }
    yield wishlist_model_1.Wishlist.findByIdAndDelete({ _id: id.toString() });
    return (0, responseHandler_1.default)(200, null, res, "Removed from Cart");
}));
