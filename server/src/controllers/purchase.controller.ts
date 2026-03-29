import { Product } from "../model/product.model";
import { Purchase } from "../model/purchaseHistory.model";
import asyncHandler from "../util/asyncHandler";
import customError from "../util/customError";
import successMsG from "../util/responseHandler";

export const purchase = asyncHandler(async (req, res, next) => {

    console.log("request came here")
    const purchaseData = req.body
    const { _id } = req.user
    const { productID } = req.params

    const product = await Product.findById({ _id: productID.toString() })
    if (!product) {
        new customError(404, "Product not found")
    }

    const buyRequest = new Purchase({
        ...purchaseData,
        product: productID,
        user: _id
    })

    await buyRequest.save()

    successMsG(201, buyRequest, res, "Your purchase request hase been made")

})


export const purchaseHistory = asyncHandler(async (req, res, next) => {

    const user = req.user._id;

    const data = await Purchase.find({ user: user }).populate('product')

    successMsG(200, data, res, "Your purchase history")

})



export const deleteHistory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = req.user._id;

    console.log("id", id)
    const wishlist = await Purchase.findById({ _id: id.toString() })

    if (!wishlist) {
        throw new customError(404, "History not found");
    }

    if (!wishlist.user.equals(user)) {

        throw new customError(403, "unauthorized access denied");

    }


    await Purchase.findByIdAndDelete({ _id: id.toString() });

    return successMsG(200, null, res, "Removed from wishlist");
});