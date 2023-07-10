import User from "@/modals/User";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
import connectDb from "@/middleware/mongoose";
const logIn = async (req, res) => {
    try {
        if (req.method == 'POST') {
            let user = await User.findOne({ "email": req.body.email })
            var bytes = CryptoJS.AES.decrypt(user.password,"mysecretkey123");
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
            if (user) {
                if (user.email === req.body.email && req.body.password === originalText) {
                    var token = jwt.sign({name:user.name,email:user.email}, 'mysecretkey123');
                    res.status(200).json({success:true,token,email:user.email})
                } else {
                    res.status(500).json({success: false,error:"Invalid Credentials"})
                }
            } else {
                res.status(401).json({success: false,error:"Invalid Credentials"})
            }
        } else {
            res.status(400).json({success: false,error:"Internal Server error"})
        }
    } catch (e) {
        res.status(500).json({success: false,error:"Internal Server error"})
    }
}
export default connectDb(logIn);