
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    category: { type: Object,required: true },
    photo: { type: Object, required: true },
    price: { type: Number, required: true, min: 1 },
    InStock: { type: Boolean, default: false, lowercase: true }
})

module.exports = new mongoose.model("product", ProductSchema)