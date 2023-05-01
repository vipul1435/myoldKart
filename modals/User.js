const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchemca = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    mobile: { type: Number }
}, { timestamps: true })
mongoose.models={};
export default mongoose.model("User", UserSchemca)