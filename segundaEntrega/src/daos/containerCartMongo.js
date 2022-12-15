import cartModel from "../models/cart.js"

class containerCartMongo {
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
                carts: carts
            }
        } else {
            return {
                status: "Error",
                message: "Carts not fount"
            }
        }
    }
//revisando
    getCartById = async (idArgument) => {
        if (!idArgument) {
            return {
                status: "Error",
                message: "ID is required"
            }
        }
        try {
            let cart = await cartModel.find({ _id: idArgument }, { __v: 0 })
            if (cart) {
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

        }

    }
}

export default containerCartMongo