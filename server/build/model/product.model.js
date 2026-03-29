"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name cannot be empty"],
        unique: [true, "Product already exists"]
    },
    price: {
        type: Number,
        required: [true, "Price cannot be empty"],
        min: [0, "Price cannot be negative"]
    },
    description: {
        type: String,
        required: true
    },
    flavour: {
        type: String
    },
    buyInfo: {
        type: Number,
        default: 0,
        min: [0, "Buy info count cannot be negative"]
    },
    likes: {
        type: Number,
        default: 0,
        min: [0, "Likes count cannot be negative"]
    },
    files: [{
            public_id: {
                type: String,
            },
            filename: {
                type: String
            },
            originalname: {
                type: String
            },
            url: {
                type: String
            }
        },]
}, {
    timestamps: true
});
exports.Product = mongoose_1.default.model('Product', productSchema);
