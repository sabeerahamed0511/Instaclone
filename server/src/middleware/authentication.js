require("dotenv").config();
const jwt = require("jsonwebtoken");


async function authentication(req, res, next) {
    if(req.headers.authorization) {
        let token = req.headers.authorization.split(" ");
        let payLoad = await jwt.verify(token[1], process.env.SECRET); 
        req.loginUser = payLoad;
    } else {
        return res.status(401).json({status : "Failed", message : "Unauthorized"})
    }
    next();
}

module.exports = authentication;