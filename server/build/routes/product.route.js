"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const uploader_1 = __importDefault(require("../middleware/uploader"));
const productRoute = (0, express_1.Router)();
productRoute.post('/', (0, uploader_1.default)().array('product', 1), product_controller_1.product);
productRoute.patch('/:id', (0, uploader_1.default)().array('product', 1), product_controller_1.updateProduct);
productRoute.delete('/:id', product_controller_1.deleteProduct);
productRoute.get('/', product_controller_1.products);
productRoute.get('/latest', product_controller_1.getLatestProducts);
productRoute.get('/mostBuyed', product_controller_1.getMostedBuyedProducts);
productRoute.get('/:productID', product_controller_1.singleProduct);
exports.default = productRoute;
