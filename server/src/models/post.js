const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    likes : {
        type : [String],
        default : []
    },
    description : {
        type : String,
        required : true
    },
    PostImage : {
        type : Object,
        required : true
    },
    date : {
        type : String,
        default : new Date().toDateString(),
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
}, {timestamps : true});

const Post = new mongoose.model("posts", postSchema);

module.exports = Post;