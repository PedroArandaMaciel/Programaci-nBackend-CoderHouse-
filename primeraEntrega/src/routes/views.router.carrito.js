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
    let carts = await contenedorCarrito.getCartById(id)
    res.send({ payload: carts.cart.cart })
})

router.post('/:cid/products', async (req, res) => {
    const id = parseInt(req.params.cid)
    const existsCart = await contenedorCarrito.exists(id)
    if (existsCart) {
        const product = req.body
        let productToInsert = await contenedorCarrito.addProduct(id, product)
        res.send(productToInsert)
    }
})



///genero carrito a medida que se ingresa producto (anotacion)
//router.post('/', async (req, res) => {
//    const {products} = req.body
//    if (!products) return res.status(400).send({status:"error", error: "incompleted value"})
//    const productsToInsert = {
//        products: products,
//        timestamp: fechaHora()
//    }
//    const result = await contenedorCarrito.saveCart(productsToInsert)
//    res.send(result)
//})

export default router;