require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { GridFSBucket, MongoClient } = require("mongodb");
const mongoClient = new MongoClient(process.env.DATABASE_URL);

const controller = {};

controller.getSingleUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        res.status(200).json({status : "Success", user});
    } catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
}

controller.register = async (req, res) => {
    let {name, email, password} = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);
    try {
        let user = await User.findOne({email});
        if(user) return res.status(400).json({status : "Failed",field : "email", message : "Email already exist!!"})
        let newUser = await new User({
            name : name,
            email : email,
            password : hashedPassword
        });
        newUser = await newUser.save();
        res.status(201).json({status : "Success", data : newUser});
    } catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
}

controller.login = async (req, res) => {
    let {email, password} = req.body;
    try {
        let user = await User.findOne({email : email});
        if(user) {
            if(await bcrypt.compare(password, user.password)) {
                let jwtToken = await jwt.sign({name : user.name, email : user.email, id : user["_id"]}, process.env.SECRET);
                res.status(200).json({status : "Success", token : "JWT " + jwtToken, user});
            } else {
                res.status(401).json({status : "Failed",field : "password", message : "Password not match!!"});
            }
        } else {
            res.status(401).json({status : "Failed",field : "email", message : "User not found!!"});
        }
       
    } catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
}

controller.updateDp = async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(req.params.id, { profile_picture : req.file.filename }, {new : true});
        res.status(201).json({ status: "Success", user });
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

controller.deleteDp = async (req, res, next) => {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(process.env.DB_NAME);
        const filesSchema = db.collection(process.env.DB_COLLECTION_DP + ".files");
        const chunksSchema = db.collection(process.env.DB_COLLECTION_DP + ".chunks");

        let user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ status: "Failed", message: "Invalid Id" });
        if(!user.profile_picture) return next();
        //del chunck
        let file = await filesSchema.findOne({filename : user.profile_picture});
        await chunksSchema.deleteMany({files_id : file._id});
        //del file
        await filesSchema.deleteOne({_id : file._id});
        next();
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

controller.renderDp = async (req, res) => {

    try {
        await mongoClient.connect();
        const db = mongoClient.db(process.env.DB_NAME);
        const bucket = new GridFSBucket(db, {
            bucketName: process.env.DB_COLLECTION_DP
        });

        const image = bucket.openDownloadStreamByName(req.params.name);
        image.on("data", data => res.status(200).write(data));
        image.on("error", err => res.status(400).send({ msg: err.message }));
        image.on("end", () => res.end());
    } catch (err) {
        res.status(500).send({ msg: err.message });
    }
}

module.exports = controller;