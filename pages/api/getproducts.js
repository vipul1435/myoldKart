import Product from "@/modals/Product";
import connectDb from "@/middleware/mongoose";

const   fetchProduct = async (req,res) =>{
    let products = await Product.find()
    res.status(200).json({products})
}

export default connectDb(fetchProduct);