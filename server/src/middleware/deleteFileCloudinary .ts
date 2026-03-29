import { v2 as cloudinary } from 'cloudinary'; 

export const deleteFileCloudinary = async (files: string[] | string) => {

    console.log("deleting file", files)
    try {
        const filesArray = Array.isArray(files) ? files : [files];

        const result = await cloudinary.api.delete_resources(filesArray);
        console.log("Deleted from Cloudinary:", result);

        return result;
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        throw error;
    }
};
    