import productModel from "../models/products.js";

class containerProductMongo {
    save = async (product) => {
        if (!product.title || !product.description || !product.code || !product.price || !product.stock) {
            return {
                status: "Error",
                message: "Missing required fields"
            }
        }
        let response = await productModel.create(product)
        return {
            status: "success",
            message: "Product added successfully",
            product: response
        }
    }

    getById = async (id) => {
        if (!id) {
            return {
                status: "Error",
                message: "ID is required"
            }
        }
        try {
            let product = await productModel.find({ _id: id }, { _id: 0, __v: 0, code: 0 })
            if (product.length > 0) {
                return {
                    status: "Success",
                    product: product
                }
            } else {
                return {
                    status: "Error",
                    product: "Product not found"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }

    getAll = async () => {
        let products = await productModel.find({}, { __v: 0, code: 0 })
        if (products.length != 0) {
            return {
                status: "success",
                products: products
            }
        } else {
            return {
                status: "Error",
                message: "No hay productos agregados"
            }
        }
    }

    updateItem = async (object, id) => {
        try {
            let newProd = { title: object.title, description: object.description, code: object.code, price: object.price, stock: object.stock }
            let response = await productModel.updateOne({ _id: id }, newProd)
            if (response.modifiedCount > 0) {
                return {
                    status: "success",
                    message: "Product updated successfully",
                    newProd
                }
            } else if (response.matchedCount > 0) {
                return {
                    status: "Error",
                    Message: "unmodified product"
                }
            } else {
                return {
                    status: "Error",
                    Message: "Product not found"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }

    deleteById = async (id) => {
        try {
            let response = await productModel.deleteOne({ _id: id })
            if (response.deletedCount > 0) {
                return {
                    status: "success",
                    message: "Product deleted successfully"
                }
            } else {
                return {
                    status: "Error",
                    Message: "Product not found"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }
}

export default containerProductMongo