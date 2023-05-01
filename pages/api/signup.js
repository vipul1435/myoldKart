import connectDb from "@/middleware/mongoose";
import User from "@/modals/User";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    try {
        if (req.method == 'POST') {
            const {name,email,password}=req.body;
            let user = new User({name,email,password:CryptoJS.AES.encrypt(password,"mysecretkey123").toString()});
            await user.save()
            var token = jwt.sign({name:name,email:email}, 'mysecretkey123');
            res.status(200).json({success:true,token})
        } else {
            res.status(400).json({success: false,error:"Internal Server error"})
        }
    } catch(e){
        res.status(500).json({success: false,error:"Internal Server error"})
    }
}
export default connectDb(signUp);