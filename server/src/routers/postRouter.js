require("dotenv").config();
const express = require("express");
const router = express.Router();
const controller = require("../controllers/postController");
const authentication = require("../middleware/authentication");

//TO GET ALL POSTS
router.get("/posts", authentication, controller.get);
//TO CREATE NEW POST
router.post("/post", authentication, controller.post);
//TO UPDATE LIKES
router.put("/posts/:id", authentication, controller.updateLikes);
// //TO DELETE
router.delete("/posts/:id", authentication, controller.delete);

module.exports = router;