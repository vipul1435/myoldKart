const mongoose = require('mongoose')
const { Schema } = mongoose;

const ProductSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    avilableQty: { type: Number, required: true },

}, { timestamps: true })

mongoose.models={};
module.exports = mongoose.model('Product', ProductSchema);