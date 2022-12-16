import { Router } from "express";
import setDb from "../daos/index.js";

const router = Router();
const contenedor = setDb()
const contenedorCarrito = contenedor.carts
const contenedorProd = contenedor.products

const fechaHora = () => {
    const fh = new Date();
    const day = fh.getDate()
    const month = fh.getMonth()
    const year = fh.getFullYear()
    const hours = fh.getHours()
    const minutes = fh.getMinutes()
    const seconds = fh.getSeconds()
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`
}

router.post('/', async (req, res) => {
    const newCart = await contenedorCarrito.createCart(fechaHora())
    res.send({ status: "success", payload: newCart })
})
router.get('/', async (req, res) => {
    const carts = await contenedorCarrito.getCarts()
    res.send({ payload: carts })
})
router.delete('/:cid', async (req, res) => {
    const id = req.params.cid
    const cart = await contenedorCarrito.deleteCartById(id)
    res.send(cart)
})

router.get('/:cid/products', async (req, res) => {
    const id = req.params.cid
    let data = await contenedorCarrito.getCartById(id)
    if (contenedor.persistenciaFsBoolean) { //Si se usa filesystem, se lee diferente la data por su estructura
        if (data.status != "error") {
            res.send({ status: "success", products: data.cart.products })
        } else {
            res.send(data)
        }
    } else {
        if (data.status === "success") {
            let products = data.cart[0].products
            res.send({ status: "success", products })
        } else {
            res.send(data)
        }
    }
})

router.post('/:cid/products', async (req, res) => {
    const idCart = req.params.cid
    const product = req.body

    const existProd = await contenedorProd.getById(product.id)
    if (existProd.status === "Error") {
        res.send({
            status: "Error",
            message: "product not found"
        })
    } else {
        const existsCart = await contenedorCarrito.exists(idCart)
        if (existsCart) {
            let productToInsert = await contenedorCarrito.addProduct(idCart, product)
            res.send(productToInsert)
        } else {
            res.send({
                status: "Error",
                message: "Cart not found"
            })
        }
    }
})

router.delete('/:cid/products/:pid', async (req, res) => {
    const carritoId = req.params.cid
    const productId = req.params.pid

    const result = await contenedorCarrito.deleteProduct(carritoId, productId)
    res.send(result)

})
export default router;