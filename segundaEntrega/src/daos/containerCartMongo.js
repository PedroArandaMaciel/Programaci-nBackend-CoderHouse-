import cartModel from "../models/cart.js"

class containerCartMongo {
    exists = async (idCart) => {
        let carts = await cartModel.find({ _id: idCart })
        return carts

    }
    createCart = async (fh) => {
        const newCart = {
            timestamp: fh,
            products: []
        }
        try {
            let response = await cartModel.create(newCart)
            return { message: "Created new cart", response }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }

    getCarts = async () => {
        let carts = await cartModel.find({}, { __v: 0 })
        if (carts.length > 0) {
            return {
                status: "success",
                carts
            }
        } else {
            return {
                status: "Error",
                message: "Carts not fount"
            }
        }
    }
    getCartById = async (idArgument) => {
        if (!idArgument) {
            return {
                status: "Error",
                message: "ID is required"
            }
        }
        try {
            let cart = await cartModel.find({ _id: idArgument }, { __v: 0 })
            if (cart.length > 0) {
                return {
                    status: "success",
                    cart: cart
                }
            } else {
                return {
                    status: "error",
                    message: "Cart not fount"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }

    }
    deleteCartById = async (idArgument) => {
        try {
            let response = await cartModel.deleteOne({ _id: idArgument })
            if (response.deletedCount > 0) {
                return {
                    status: "Success",
                    message: "Cart deleted successfully"
                }
            } else {
                return {
                    status: "Error",
                    Message: "Cart not found"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }
    addProduct = async (idArgument, product) => {
        try {
            let sendProd = await cartModel.updateOne({ _id: idArgument }, { $push: { products: product } })
            if (sendProd.modifiedCount > 0) {
                return {
                    status: "Success",
                    message: "Product added successfully"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }
    deleteProduct = async (cid, pid) => {
        //falta implementar
    }
}

export default containerCartMongo