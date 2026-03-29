"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wishlist = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../types/enum");
const wishlistSchema = new mongoose_1.default.Schema({
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    wishlistType: {
        type: String,
        enum: Object.values(enum_1.IWishlist),
        required: true
    }
}, {
    timestamps: true
});
exports.Wishlist = mongoose_1.default.model("Wishlist", wishlistSchema);
