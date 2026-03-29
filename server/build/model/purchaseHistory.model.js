"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const purchaseSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    city: {
        type: String
    },
    zipCode: {
        type: Number
    },
    country: {
        type: String
    },
    total: {
        type: Number
    }
}, {
    timestamps: true
});
exports.Purchase = mongoose_1.default.model('purchase', purchaseSchema);
