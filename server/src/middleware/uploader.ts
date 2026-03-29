import multer from "multer";
import cloudinary from "../config/cloudinary";
import { CloudinaryStorage } from 'multer-storage-cloudinary'


const upload = () => {

    const storage = new CloudinaryStorage({

        cloudinary: cloudinary,
        params: async (req, file) => {

            return {
                folder: "medi-care",
                public_id: Date.now() + '-' + Math.round(Math.random() * 1E9) + file.originalname,
                allowed_format: "auto",
                resource_type: 'auto',
            };
        },
    });

    const uploader = multer({ storage: storage })

    return uploader
}


export default upload