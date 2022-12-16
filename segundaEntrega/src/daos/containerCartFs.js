import fs from 'fs'
import __dirName from '../utils.js'

class ContenedorCarrito {

    constructor() {
        this.path = `${__dirName}/files/carrito.json`
        this.init()
    }
    init = async () => {
        if (!fs.existsSync(this.path)) await fs.promises.writeFile(this.path, JSON.stringify([]))
    }
    readFile = async () => {
        let data = await fs.promises.readFile(this.path, 'utf-8')
        return JSON.parse(data);
    }
    exists = async (idArgument) => {
        let id = parseInt(idArgument)
        let carts = await this.getCarts()
        return carts.carts.some(cart => cart.id === id)
    }

    createCart = async (fh) => {
        const carts = await this.readFile()
        const newCart = {
            id: carts.length === 0 ? 1 : carts[carts.length - 1].id + 1,
            timestamp: fh,
            products: []
        }
        carts.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))
        return newCart
    }
    getCarts = async () => {
        let carts = await this.readFile()
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
    getCartById = async (idArgument) => {
        if (!idArgument) {
            return {
                status: "Error",
                message: "ID is required"
            }
        }
        try {
            let id = parseInt(idArgument)
            const carts = await this.readFile()
            const cart = carts.find((cart) => cart.id === id)
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
            return {
                status: "Error",
                message: error.message
            }
        }
    }
    deleteCartById = async (idArgument) => {
        if (!idArgument) {
            return {
                status: "Error",
                message: "ID is required"
            }
        }
        let id = parseInt(idArgument)
        const carts = await this.readFile()
        if (carts.find(cart => cart.id === id)) {
            let newCarts = carts.filter((cart) => cart.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(newCarts, null, '\t'))
            return {
                status: "success",
                message: "Cart deleted successfully"
            }
        } else {
            return {
                status: "error",
                message: "Cart not fount"
            }
        }
    }
    addProduct = async (idArgument, product) => {
        if (!idArgument || !product) {
            return {
                status: "Error",
                message: "param is required"
            }
        }
        let id = parseInt(idArgument)
        let carts = await this.readFile()
        let addedProduct;
        //se genera el nuevo producto
        let newCarts = carts.map(cart => {
            if (cart.id === id) {
                return addedProduct = {
                    id: cart.id,
                    timestamp: cart.timestamp,
                    products: [...cart.products, {
                        id: product.id,
                        quantity: product.quantity
                    }]
                }
            } else {
                return cart
            }
        })


        await fs.promises.writeFile(this.path, JSON.stringify(newCarts, null, '\t'))
        return { status: "success", payload: addedProduct }
    }
    deleteProduct = async (caId, prId) => {
        let cid = parseInt(caId)
        let pid = parseInt(prId)
        let carts = await this.readFile()
        let deletedProd = []
        let editedProducts = carts.map(cart => {
            if (cart.id === cid) {
                let products = []
                cart.products.map(product => {
                    if (product.id != pid) {
                        products.push(product)
                    } else {
                        deletedProd.push(product)
                    }
                })
                return {
                    id: cart.id,
                    timestamp: cart.timestamp,
                    products: products
                }
            } else {
                return cart
            }
        })
        await fs.promises.writeFile(this.path, JSON.stringify(editedProducts, null, '\t'))
        return { status: "success", message: "Deleted product", deletedProd }
    }
}

export default ContenedorCarrito;