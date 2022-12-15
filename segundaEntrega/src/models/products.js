import mongoose from "mongoose";

const collection = 'products';
const schema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    stock: Number
})
const productModel = mongoose.model(collection, schema)

export default productModel;