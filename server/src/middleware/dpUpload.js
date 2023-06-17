require("dotenv").config();
const cloudinary = require("./cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage} = require("multer-storage-cloudinary");

const Storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params : (req, file ) => {
        
        return {
            folder : "INSTACLONE-DP",
            public_id : `${Date.now()}_${file.originalname}`,
            resource_type : "auto"
        }
    } 
})

const upload = multer({
    storage : Storage,
}).single("profile_picture")

module.exports = {upload, multer};