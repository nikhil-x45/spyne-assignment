const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const userAuth = async (req, res, next) => {
    try { 
        const cookie = req.cookies;
        const {token} = cookie;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found!"
            });
        }

        const decodedMsg = jwt.verify(token,process.env.JWT_SECRET);
        const {userId} = decodedMsg;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not registered!"
            });
        }
        req.user = user;
        
        next();
    } catch(err) {
        res.send("Error: " + err.message);
    }
}

module.exports = userAuth;