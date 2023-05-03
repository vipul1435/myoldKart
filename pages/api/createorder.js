import Razorpay from "razorpay";
const createorder = async (req, res) => {
    if (req.method == "POST") {
        const instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_KEY_ID, key_secret: process.env.NEXT_PUBLIC_KEY_SECRET });
        const { subTotal} = req.body;
        const options = {
            amount: subTotal*100,
            currency: "INR"
        }
        try {
            const order =  await instance.orders.create(options);
            res.status(200).json({success:true,order:order});
        } catch (e) {
            res.status(400).json({ success: false, error: "Internal Server error" })
        }
    } else {
        res.status(501).json({ success: false, error: "method not allowed" })
    }
}
export default createorder;