import mongoose from "mongoose";

const collection = 'cart';
const schema = new mongoose.Schema({
    id: String,
    quantity: Number
})
const cartModel = mongoose.model(collection, schema)

export default cartModel;