const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");

const Storage = new GridFsStorage({
    url : process.env.DATABASE_URL+process.env.DB_NAME,
    file : (req, file ) => {
        return {
            bucketName : process.env.DB_COLLECTION_DP,
            filename : `${Date.now()}_${file.originalname}`
        }
    } 
})

const upload = multer({
    storage : Storage
})

router.get("/users/:id", controller.getSingleUser);

//TO REGISTER 
router.post("/register", controller.register);

//TO LOG IN
router.post("/login", controller.login);

router.put("/users/:id", controller.deleteDp, controller.updateDp);


module.exports = router;