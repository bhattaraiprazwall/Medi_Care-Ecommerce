import { deleteFileCloudinary } from "../middleware/deleteFileCloudinary ";
import { Product } from "../model/product.model";
import { IProductDoc, removeFile } from "../services/fileRemover";
import asyncHandler from "../util/asyncHandler";
import customError from "../util/customError";
import mapUploadFile from "../util/mapUploadFiles";
import successMsG from "../util/responseHandler";


//add product
export const product = asyncHandler(async (req, res, next) => {

    const { ...body } = req.body;
    //
    console.log("Request Check");

    const files = req.files as Express.Multer.File[]

    if (!files) {
        throw new customError(404, "product image required")
    }

    const product = await Product.findOne({ name: body.name })
    if (product) {
        throw new customError(400, "product already exists")
    }


    console.log("controller", files)
    const newProduct = new Product(body)

    if (files && files?.length > 0) {

        const mappedFile = mapUploadFile(files);
        console.log("mappedfile", mappedFile)
        newProduct.files.push(...mappedFile)

    }

    const data = await newProduct.save()

    if (data) {

        successMsG(201, data, res, "Product added successfully")
    }

})

//update product
export const updateProduct = asyncHandler(async (req, res, next) => {

    const { deletedFiles, ...body } = req.body;
    const { id } = req.params;
    const files = req.files as Express.Multer.File[]

    console.log("files", files)

    const product = await Product.findOne({ _id: id });

    if (!product) {
        throw new customError(404, "product not found")
    }

    if (deletedFiles && deletedFiles.length > 0) {

        const filesToDelete: string[] = JSON.parse(deletedFiles)
        // console.log(filesToDelete)

        filesToDelete.forEach((filesToDelete) => {

            const match = product.files.find(r => r.filename === filesToDelete);

            if (match) product.files.pull(match._id);
        })

        await deleteFileCloudinary(filesToDelete)

    }

    if (files && files?.length > 0) {

        files.forEach((file) =>
            product.files.push({
                filename: file.filename,
                originalname: file.originalname,
                public_id: file.path,
                url: file.path,
            })
        )


    }

    Object.assign(product, body);
    const data = await product.save()

    if (data) {

        successMsG(201, data, res, "Product updated successfully")
    }

})

//delete product
export const deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    console.log("id", id)
    const product = await Product.findById(id) as IProductDoc;
    const allFilenames = product.files.map(file => file.public_id);

    if (!product) {
        throw new customError(404, "Product not found");
    }

    // Delete associated files from Cloudinary and Mongo array
    await removeFile(product, allFilenames);

    // Delete the product itself
    await Product.findByIdAndDelete({ _id: id.toString() });

    return successMsG(200, null, res, "Product deleted successfully");
});

//getAll product
export const products = asyncHandler(async (req, res, next) => {

    const data = await Product.find()

    return successMsG(200, data, res, "All products successfully");


})
//getSingle product
export const singleProduct = asyncHandler(async (req, res, next) => {

    const { productID } = req.params;

    const data = await Product.findOne({ _id: productID })

    if (!data) {

        throw new customError(404, 'Not found')
    }

    return successMsG(200, data, res, "All products successfully");


})


//getLatest product
export const getLatestProducts = asyncHandler(async (req, res, next) => {

    const data = await Product.find().sort({ createdAt: -1 }).limit(10)

    return successMsG(200, data, res, "Latest product fetche")

})

//getLatest product
export const getMostedBuyedProducts = asyncHandler(async (req, res, next) => {


    const data = await Product.find().sort({ buyInfo: -1 }).limit(10)

    return successMsG(200, data, res, "MostBuyed product fetche")
})


export const getMostedlikedProducts = asyncHandler(async (req, res, next) => {


    const data = await Product.find().sort({ likes: -1 }).limit(10)

    return successMsG(200, data, res, "MostBuyed product fetche")
})


//getLatest product
export const getFavouriteProducts = asyncHandler(async (req, res, next) => {


    const data = await Product.find().sort({ likes: -1 }).limit(10)

    return successMsG(200, data, res, "Favourite product fetche")
})

