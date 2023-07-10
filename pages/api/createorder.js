import Product from "@/modals/Product";
import Razorpay from "razorpay";
import shortid from "shortid";


const instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_KEY_ID, key_secret: process.env.NEXT_PUBLIC_KEY_SECRET });
const createorder = async (req, res) => {
    if (req.method == "POST") {

        //HERE WE HAVE TO CHECK IF PINCODCE IS SERVIACEABLE


        //HERE LOGIC FOR CHECK THE CART IS NOT TEMPERED
        let subtotal = 0, product;
        for (let item in req.body.Cart) {
            subtotal += req.body.Cart[item].price * req.body.Cart[item].qty;
            product = await Product.findOne({ slug: item });
            if (product.price != req.body.Cart[item].price) {
                res.status(400).json({ success: false, error: "Price of some item has been changed please try again" });
                return;
            }
            // HERE CHECKING IF ITEM IS OUT OF STOCK
            if (product.avilableQty < req.body.Cart[item].qty) {
                res.status(400).json({ success: false, error: "Some item are out of stock: Please try again" });
                return;
            }
        }
        const { subTotal } = req.body;
        if (subtotal != subTotal) {
            res.status(400).json({ success: false, error: "Price of some item has been changed please try again" });
            return;
        }
        // FOR THE 
        const options = {
            amount: subTotal * 100,
            currency: "INR",
            receipt: shortid.generate()
        }
        try {
            const order = await instance.orders.create(options);
            res.status(200).json({ success: true, order: order });
        } catch (e) {
            res.status(400).json({ success: false, error: "Internal Server error" })
        }
    } else {
        res.status(501).json({ success: false, error: "method not allowed" })
    }
}
export default createorder;