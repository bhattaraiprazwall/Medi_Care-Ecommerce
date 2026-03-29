import { Router } from "express";
import { deleteProduct, getLatestProducts, getMostedBuyedProducts, product, products, singleProduct, updateProduct } from "../controllers/product.controller";
import upload from "../middleware/uploader";

const productRoute = Router()

productRoute.post('/', upload().array('product', 1), product)
productRoute.patch('/:id', upload().array('product', 1), updateProduct)
productRoute.delete('/:id', deleteProduct)
productRoute.get('/', products)
productRoute.get('/latest', getLatestProducts)
productRoute.get('/mostBuyed', getMostedBuyedProducts)
productRoute.get('/:productID', singleProduct)


export default productRoute