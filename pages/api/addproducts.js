import Product from "@/modals/Product";
import connectDb from "@/middleware/mongoose";

const addProduct = async (req, res) => {
    if (req.method == 'POST') {
        try {
            let p = new Product({
                title: req.body.title,
                slug: req.body.slug,
                desc: req.body.desc,
                image: req.body.image,
                category: req.body.category,
                size: req.body.size,
                color: req.body.color,
                price: req.body.price,
                avilableQty: req.body.avilableQty,
            })
            await p.save();
            res.status(200).json({ success: true })
        } catch (e) {
            res.status(500).json({ success: false, error: "Item may already Exist or some Internal Error Occured" })
        }
    } else {
        res.status(400).json({ success: false, error: "This methos is not allowed" })
    }
}

export default connectDb(addProduct);