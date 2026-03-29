import { IProduct } from "./product.interface";

export interface IWishlist {

    _id: string,
    product: IProduct
}

export interface ICart {

    _id: string,
    product: IProduct
}