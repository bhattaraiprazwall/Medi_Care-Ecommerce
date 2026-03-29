import { Document, Types } from 'mongoose';
import { deleteFileCloudinary } from '../middleware/deleteFileCloudinary ';

// Interface for a single file subdocument
export interface IProductFile {
    public_id: string;
    filename: string;
    originalname: string;
}

// File subdocument type (Mongoose-style)
export interface IProductFileSubDoc extends IProductFile, Document { }

// Interface for the full product document
export interface IProductDoc extends Document {
    name: string;
    price: number;
    buyInfo: number;
    files: Types.DocumentArray<IProductFileSubDoc>; // Mongoose's DocumentArray
}

export const removeFile = async (product: IProductDoc, filesToDelete: string[]) => {
    if (!filesToDelete || filesToDelete.length === 0) return;

    const cloudinaryIdsToDelete: string[] = [];
    console.log('files name', filesToDelete)
    
    filesToDelete.forEach((filename) => {
        const match = product.files.find(file => file.filename === filename);
        if (match) {
            product.files.pull(match._id);
            if (match.public_id) cloudinaryIdsToDelete.push(match.public_id);
        }
    });

    console.log("deleting file fileremover", cloudinaryIdsToDelete)

    if (cloudinaryIdsToDelete.length > 0) {
        await deleteFileCloudinary(cloudinaryIdsToDelete);
        product.markModified("files");
    }
};

