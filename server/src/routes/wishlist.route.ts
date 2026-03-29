import { Router } from "express";
import { cart, createWishlist, deletefromcart, deletefromwishlist, getCart, getWishlist } from "../controllers/wishlist.controller";
import auth from "../middleware/auth.middleware";
import { Role } from "../types/enum";

const wishlistRoute = Router();

wishlistRoute.get('/wishlist', auth([Role.admin, Role.user]), getWishlist)
wishlistRoute.get('/cart', auth([Role.admin, Role.user]), getCart)
wishlistRoute.patch('/wishlist/:id', auth([Role.admin, Role.user]), createWishlist)
wishlistRoute.patch('/cart/:id', auth([Role.admin, Role.user]), cart)
wishlistRoute.delete('/wishlist/:id', auth([Role.admin, Role.user]), deletefromwishlist)
wishlistRoute.delete('/cart/:id', auth([Role.admin, Role.user]), deletefromcart)

export default wishlistRoute