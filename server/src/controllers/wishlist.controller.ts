import { Wishlist } from "../model/wishlist.model";
import asyncHandler from "../util/asyncHandler";
import { IWishlist } from "../types/enum";
import successMsG from "../util/responseHandler";
import customError from "../util/customError";
import { Product } from "../model/product.model";

export const createWishlist = asyncHandler(async (req, res, next) => {

    const { id } = req.params
    const user = req.user._id

    const product = await Product.findById({ _id: id })

    if (!product) {
        throw new customError(404, "Product not found")
    }

    const existing = await Wishlist.findOne({
        product: id,
        user: user,
        wishlistType: IWishlist.wishlist
    })

    if (existing) {

        throw new customError(409, "Product already in wishlist")
    }

    const newWishlist = new Wishlist({
        product: id,
        user: user,
        wishlistType: IWishlist.wishlist
    });



    const data = await newWishlist.save()

    return successMsG(201, data, res, "Added in whislist")
})


export const cart = asyncHandler(async (req, res, next) => {

    const { id } = req.params
    const user = req.user._id

    const product = await Product.findById({ _id: id })

    if (!product) {
        throw new customError(404, "Product not found")
    }

    const existing = await Wishlist.findOne({
        product: id,
        user: user,
        wishlistType: IWishlist.cart
    })

    if (existing) {

        throw new customError(409, "Product already in Cart")
    }

    const cart = new Wishlist({
        product: id,
        user: user,
        wishlistType: IWishlist.cart
    });


    const data = await cart.save()

    return successMsG(201, data, res, "Added in Cart")
})

export const del = asyncHandler(async (req, res, next) => {

    const { id } = req.params //wishlistID
    const user = req.user._id

    const wishlist = await Wishlist.findOne({ _id: id })


    if (!wishlist) {

        throw new customError(404, "Product not found ")
    }


    if (!wishlist.user.equals(user)) {
        throw new customError(403, "Not authorized to delete this wishlist item");
    }





    const data = await Wishlist.findByIdAndDelete({ _id: id })

    return successMsG(200, data, res, "Deleted successfully")
})


export const getWishlist = asyncHandler(async (req, res, next) => {

    const userID = req.user._id


    const data = await Wishlist.find({
        user: userID,
        wishlistType: IWishlist.wishlist
    }).populate('product')


    if (data.length > 0) {

        return successMsG(200, data, res, "User Wishlist Fetched")

    }

    return successMsG(200, data, res, "User Wishlist Empty");
})

export const getCart = asyncHandler(async (req, res, next) => {

    const userID = req.user._id


    const data = await Wishlist.find({
        user: userID,
        wishlistType: IWishlist.cart
    }).populate('product')

    if (data.length > 0) {

        return successMsG(200, data, res, "User Cart Fetched")

    }

    return successMsG(200, data, res, "User Cart Empty");

})

export const deletefromwishlist = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = req.user._id;

    console.log("id", id)
    const wishlist = await Wishlist.findById({ _id: id.toString() })

    if (!wishlist) {
        throw new customError(404, "Wishlist not found");
    }

    if (!wishlist.user.equals(user)) {

        throw new customError(403, "unauthorized access denied");

    }


    await Wishlist.findByIdAndDelete({ _id: id.toString() });

    return successMsG(200, null, res, "Removed from wishlist");
});

export const deletefromcart = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = req.user._id;

    console.log("id", id)
    const wishlist = await Wishlist.findById({ _id: id.toString() })

    if (!wishlist) {
        throw new customError(404, "Cart item not found");
    }

    if (!wishlist.user.equals(user)) {

        throw new customError(403, "unauthorized access denied");

    }


    await Wishlist.findByIdAndDelete({ _id: id.toString() });

    return successMsG(200, null, res, "Removed from Cart");
});
