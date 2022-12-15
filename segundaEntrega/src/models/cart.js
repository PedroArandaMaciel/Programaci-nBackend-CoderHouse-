import mongoose from "mongoose";

const collection = 'cart';
const schema = new mongoose.Schema({
    timestamp: String,
    products: Array
})
const cartModel = mongoose.model(collection, schema)

export default cartModel;