import Product from "@/modals/Product";
import connectDb from "@/middleware/mongoose";

const deleteproducts = async (req, res) => {
    try {
        if (req.method == 'POST') {
            for (let i = 0; i < req.body.length; i++) {
                await Product.findByIdAndDelete(req.body[i]._id);
            }
            res.status(200).json({ success: "Item has been added" })
        } else {
            res.status(400).json({ error: "This methos is not allowed" })
        }
    } catch(e){
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export default connectDb(deleteproducts);