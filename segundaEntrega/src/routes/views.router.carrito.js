import { Router } from "express";
//import ContenedorCarrito from "../daos/containerCardFs.js";
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

router.delete('/:cid', async (req, res) => {
    const id = parseInt(req.params.cid)
    const cart = await contenedorCarrito.deleteCartById(id)
    res.send(cart)
})

router.get('/:cid/products', async (req, res) => {
    const id = parseInt(req.params.cid)
    let data = await contenedorCarrito.getCartById(id)
    let products = [];
    if (data.status === "success") {
        data.cart.products.map(product => products.push(product))
        res.send({ payload: products })
    } else {
        res.send(cart)
    }
})

router.post('/:cid/products', async (req, res) => {
    const id = parseInt(req.params.cid)
    const product = req.body

    const existProd = await contenedorProd.getById(parseInt(product.id))
    if (existProd.status === "Error") {
        res.send({
            status: "Error",
            message: "product not found"
        })
    } else {
        const existsCart = await contenedorCarrito.exists(id)
        if (existsCart) {
            let productToInsert = await contenedorCarrito.addProduct(id, product)
            res.send(productToInsert)
        } else {
            res.send({
                status: "Error",
                error: "Cart not found"
            })
        }
    }
})

router.delete('/:cid/products/:pid', async (req, res) => {
    const carritoId = parseInt(req.params.cid)
    const productId = parseInt(req.params.pid)

    const result = await contenedorCarrito.deleteProduct(carritoId, productId)
    res.send(result)

})
export default router;