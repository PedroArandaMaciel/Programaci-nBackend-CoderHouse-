import { Router } from "express";
import ContenedorCarrito from "../Contenedor/contenedorCarrito.js";

const router = Router();
const contenedorCarrito = new ContenedorCarrito()

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

router.delete('/:cid', async (req, res) => {
    const id = parseInt(req.params.cid)
    const cart = await contenedorCarrito.deleteCartById(id)
    res.send(cart)
})

router.get('/:cid/products', async (req, res) => {
    const id = parseInt(req.params.cid)
    let cart = await contenedorCarrito.getCartById(id)
    let products = [];
    if (cart.status != "error") {
        cart.cart.cart.map(product => products.push(product))
        res.send({ payload: products })
    } else {
        res.send(cart)
    }
})

router.post('/:cid/products', async (req, res) => {
    const cid = parseInt(req.params.cid)
    const existsCart = await contenedorCarrito.exists(cid)
    if (existsCart) {
        const product = req.body
        let productToInsert = await contenedorCarrito.addProduct(cid, product)
        res.send(productToInsert)
    } else {
        res.send({
            status: "error",
            error: "Cart not found"
        })
    }
})

router.delete('/:cid/products/:pid', async (req, res) => {
    const carritoId = parseInt(req.params.cid)
    const productId = parseInt(req.params.pid)
    const existsCart = await contenedorCarrito.exists(carritoId)
    if (existsCart) {
        const result = await contenedorCarrito.deleteProduct(carritoId, productId)
        res.send(result)
    } else {
        res.send({
            status: "error",
            error: "Cart not found"
        })
    }
})




/*
///genero carrito a medida que se ingresa producto (ANOTACION DE CODIGO GENERADO)
router.post('/', async (req, res) => {
    const {products} = req.body
    if (!products) return res.status(400).send({status:"error", error: "incompleted value"})
    const productsToInsert = {
        products: products,
        timestamp: fechaHora()
    }
    const result = await contenedorCarrito.saveCart(productsToInsert)
    res.send(result)
})
*/

export default router;