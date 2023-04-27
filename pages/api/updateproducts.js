import Product from "@/modals/Product";
import connectDb from "@/middleware/mongoose";

const addProduct = async (req, res) => {
    try {
        if (req.method == 'POST') {
            for (let i = 0; i < req.body.length; i++) {
                await Product.findByIdAndUpdate(req.body[i]._id,req.body[i]);
            }
            res.status(200).json({ success: "Item has been added" })
        } else {
            res.status(400).json({ error: "This methos is not allowed" })
        }
    } catch(e){
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export default connectDb(addProduct);