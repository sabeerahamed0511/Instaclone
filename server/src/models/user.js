const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        lowercase : true,
        required : true,
        unique : true
    },
    profile_picture : {
        type : String,
        default : null
    },
    posts : {
        type : [String],
        default : []
    },
    password : {
        type : String,
        required : true
    }
});

const User = new mongoose.model("users", userSchema);

module.exports = User;