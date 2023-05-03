const crypto = require("crypto");
const orderverification = async (req, res) => {
    let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var expectedSignature = crypto.createHmac('sha256', process.env.NEXT_PUBLIC_KEY_SECRET)
        .update(body.toString())
        .digest('hex');
    var response = { "signatureIsValid": "false" }
    if (expectedSignature === req.body.razorpay_signature)
        response = { "signatureIsValid": "true" }
    res.status(200).json({ response, order: req.body })
}
export default orderverification;