import Order from "@/modals/Order";
const crypto = require("crypto");

const orderverification = async (req, res) => {
    let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var expectedSignature = crypto.createHmac('sha256', process.env.NEXT_PUBLIC_KEY_SECRET)
        .update(body.toString())
        .digest('hex');
    // var response = { "signatureIsValid": "false" }
    if (expectedSignature === req.body.razorpay_signature) {
        let ress = await Order.findOneAndUpdate({ orderId: req.body.razorpay_order_id }, { payment_status: "Paid", payment_detail: req.body.razorpay_payment_id, delivery_status: "Ordered" })
        let myres = JSON.parse(JSON.stringify(ress));
        res.redirect(`/order?id=${myres._id}`, 200)
    } else {
        res.redirect(`/order?id=${myres._id}`, 200)
    }
    //     response = { "signatureIsValid": "true" }
    // res.status(200).json({ response, order: req.body })
}
export default orderverification;