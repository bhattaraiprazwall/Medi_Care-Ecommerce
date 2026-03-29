"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wishlist_controller_1 = require("../controllers/wishlist.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const enum_1 = require("../types/enum");
const wishlistRoute = (0, express_1.Router)();
wishlistRoute.get('/wishlist', (0, auth_middleware_1.default)([enum_1.Role.admin, enum_1.Role.user]), wishlist_controller_1.getWishlist);
wishlistRoute.get('/cart', (0, auth_middleware_1.default)([enum_1.Role.admin, enum_1.Role.user]), wishlist_controller_1.getCart);
wishlistRoute.patch('/wishlist/:id', (0, auth_middleware_1.default)([enum_1.Role.admin, enum_1.Role.user]), wishlist_controller_1.createWishlist);
wishlistRoute.patch('/cart/:id', (0, auth_middleware_1.default)([enum_1.Role.admin, enum_1.Role.user]), wishlist_controller_1.cart);
wishlistRoute.delete('/wishlist/:id', (0, auth_middleware_1.default)([enum_1.Role.admin, enum_1.Role.user]), wishlist_controller_1.deletefromwishlist);
wishlistRoute.delete('/cart/:id', (0, auth_middleware_1.default)([enum_1.Role.admin, enum_1.Role.user]), wishlist_controller_1.deletefromcart);
exports.default = wishlistRoute;
