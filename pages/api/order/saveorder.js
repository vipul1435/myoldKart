import connectDb from "@/middleware/mongoose";
import Order from "@/modals/Order";

const saveorder = async (req, res) => {
    try {
        if (req.method == "POST") {
            const { email, products, address, amount, orderId } = req.body;
            const order = new Order({ email, products, address, amount, orderId });
            await order.save();
            res.status(200).json({ "success": true, message: "Order has been Created" })
        } else {
            res.status(501).json({ "success": false, error: "Internal Server Error" })
        }
    } catch (e) {
        res.status(501).json({ "success": false, error: "Internal Server Error" })
    }
}
export default connectDb(saveorder);