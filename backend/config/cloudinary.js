import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadCloudinary = async (filePath) => {
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    if (!filePath) {
        return null;
    }
    try {
        // Upload an image
     const uploadResult = await cloudinary.uploader.upload(filePath)
     fs.unlinkSync(filePath); // remove file from server after upload
     return uploadResult.secure_url;
    } catch (error) {
        fs.unlinkSync(filePath); // remove file from server if upload fails
        console.log(error); 
    }
    
}

export default uploadCloudinary;