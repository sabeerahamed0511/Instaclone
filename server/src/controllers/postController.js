require("dotenv").config();
const Post = require("../models/post");
const User = require("../models/user");
const cloudinary = require("../middleware/cloudinary");

const controller = {};

controller.get = async (req, res) => {
    try {
        let posts = await Post.find();
        res.status(200).json({ status: "Success", data: posts });
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

controller.post = async (req, res) => {
    try {
        let uploadedFile = await cloudinary.v2.uploader.upload(req.body.PostImage, {folder: "INSTACLONE-POSTS" });

        let newPost = await new Post({
            ...req.body,
            PostImage: {
                url : uploadedFile.secure_url,
                id : uploadedFile.public_id
            }
        })
        newPost = await newPost.save();
        await User.findByIdAndUpdate(req.body.user, { $push: { posts: newPost._id } });
        res.status(201).json({ status: "Success", data: newPost });
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

controller.updateLikes = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ status: "Failed", message: "Invalid Id" });
        if (post.likes.indexOf(req.body.user) === -1) {
            post = await Post.findByIdAndUpdate(req.params.id, { $push: { likes: req.body.user } }, { new: true });
            res.status(200).json({ status: "Success", post });
        } else {
            res.status(401).json({ status: "Failed", message: "Already like given!!" });
        }

    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

controller.delete = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ status: "Failed", message: "Invalid Id" });
        await cloudinary.v2.uploader.destroy(post.PostImage.id);
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: "Success" });
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

// controller.put = async (req, res) => {
//     try {
//         let post = await Post.findById(req.params.id)
//         if(!post) return res.status(404).json({status : "Failed", message : "Invalid Id"});
//         if(post.user == req.loginUser.userId) {
//             let updated = await Post.findByIdAndUpdate(req.params.id, req.body, {new : true});
//             res.status(200).json({status : "Success"});
//         } else {
//             res.status(401).json({status : "Failed", message : "Unauthorized"});
//         }

//     } catch (err) {
//         res.status(400).json({status : "Failed", message : err.message});
//     }
// }




module.exports = controller;