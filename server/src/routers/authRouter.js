const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

router.get("/users/:id", controller.getSingleUser);

//TO REGISTER 
router.post("/register", controller.register);

//TO LOG IN
router.post("/login", controller.login);

router.put("/users/:id", controller.deleteDp, controller.updateDp);


module.exports = router;