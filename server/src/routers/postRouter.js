require("dotenv").config();
const express = require("express");
const router = express.Router();
const controller = require("../controllers/postController");
const upload = require("../middleware/imageUpload");
const authentication = require("../middleware/authentication");

//TO GET ALL POSTS
router.get("/posts", authentication, controller.get);
//TO CREATE NEW POST
router.post("/post", authentication, upload.single("PostImage"), controller.post);
//TO UPDATE LIKES
router.put("/posts/:id", authentication, controller.updateLikes);
//TO RENDER POSTED IMAGES
router.get("/images/:name", controller.download);
// //TO DELETE
router.delete("/posts/:id", authentication, controller.delete);

module.exports = router;