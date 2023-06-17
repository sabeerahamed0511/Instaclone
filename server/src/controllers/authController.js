require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../middleware/cloudinary");
const { upload, multer } = require("../middleware/dpUpload");

const controller = {};

controller.getSingleUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        res.status(200).json({ status: "Success", user });
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

controller.register = async (req, res) => {
    let { name, email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ status: "Failed", field: "email", message: "Email already exist!!" })
        let newUser = await new User({
            name: name,
            email: email,
            password: hashedPassword
        });
        newUser = await newUser.save();
        res.status(201).json({ status: "Success", data: newUser });
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

controller.login = async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                let jwtToken = await jwt.sign({ name: user.name, email: user.email, id: user["_id"] }, process.env.SECRET);
                res.status(200).json({ status: "Success", token: "JWT " + jwtToken, user });
            } else {
                res.status(401).json({ status: "Failed", field: "password", message: "Password not match!!" });
            }
        } else {
            res.status(401).json({ status: "Failed", field: "email", message: "User not found!!" });
        }

    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

controller.updateDp = async (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(401).json({ status: "Failed", message: err.message });
        } else if (err) {
            return res.status(401).json({ status: "Failed", message: err.message });
        }
        try {
            let user = await User.findByIdAndUpdate(req.params.id, {
                profile_picture: {
                    url: req.file.path,
                    id: req.file.filename,
                    type: req.file.mimetype.split("/")[0]
                }
            }, { new: true });
            res.status(201).json({ status: "Success", user });
        } catch (err) {
            res.status(400).json({ status: "Failed", message: err.message });
        }
    })
}

controller.deleteDp = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ status: "Failed", message: "Invalid Id" });
        if (!user.profile_picture) return next();
        await cloudinary.v2.uploader.destroy(user.profile_picture.id);
        next();
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

module.exports = controller;