import connectDb from "@/middleware/mongoose";
import Order from "@/modals/Order";
import jwt from 'jsonwebtoken';

const fetchOrder = async (req, res) => {
    try {
        if (req.method == "POST") {
            const {token} = req.body;
            const data = jwt.verify(token,"mysecretkey123")
            const orders = await Order.find({email:data.email})
            res.status(200).json({ "success": true, orders:orders})
        } else {
            res.status(501).json({ "success": false, error: "Internal Server Error" })
        }
    } catch (e) {
        res.status(501).json({ "success": false, error: "Internal Server Error" })
    }
}
export default connectDb(fetchOrder);