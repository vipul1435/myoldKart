import Product from "@/modals/Product";
import connectDb from "@/middleware/mongoose";

const addProduct = async (req, res) => {
    try {
        if (req.method == 'POST') {
            for (let i = 0; i < req.body.length; i++) {
                let p = new Product({
                    title: req.body[i].title,
                    slug: req.body[i].slug,
                    desc: req.body[i].desc,
                    image: req.body[i].image,
                    category: req.body[i].category,
                    size: req.body[i].size,
                    color: req.body[i].color,
                    price: req.body[i].price,
                    avilableQty: req.body[i].avilableQty,
                })
                await p.save();
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