const mongoose = require('mongoose')
const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: { type: String, required: true },
    products: { type: Object, required: true },
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    payment_status: { type: String, default: "pending"},
    payment_detail:{type: String, default: "Not completed"},
    orderId:{ type: String, required: true },
    delivery_status: { type: String, default: "pending"}
}, { timestamps: true })

mongoose.models = {};
export default mongoose.model("Order", OrderSchema)