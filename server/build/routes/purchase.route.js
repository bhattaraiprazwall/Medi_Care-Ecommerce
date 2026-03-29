"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchase_controller_1 = require("../controllers/purchase.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const enum_1 = require("../types/enum");
const purchaseRoute = (0, express_1.Router)();
purchaseRoute.post('/:productID', (0, auth_middleware_1.default)([enum_1.Role.admin, enum_1.Role.user]), purchase_controller_1.purchase);
purchaseRoute.get('/history', (0, auth_middleware_1.default)([enum_1.Role.admin, enum_1.Role.user]), purchase_controller_1.purchaseHistory);
purchaseRoute.delete('/:id', (0, auth_middleware_1.default)([enum_1.Role.admin, enum_1.Role.user]), purchase_controller_1.deleteHistory);
exports.default = purchaseRoute;
