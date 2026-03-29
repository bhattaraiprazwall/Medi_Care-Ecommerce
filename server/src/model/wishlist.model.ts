import mongoose from "mongoose";
import { IWishlist } from "../types/enum";

const wishlistSchema = new mongoose.Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    wishlistType: {
        type: String,
        enum: Object.values(IWishlist),
        required: true
    }
}, {
    timestamps: true
})


export const Wishlist = mongoose.model("Wishlist", wishlistSchema)