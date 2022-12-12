import { Router } from "express";
//import Contenedor from "../daos/containerProductFs.js";
import setDb from "../daos/index.js";
import uploader from "../services/upload.js";

const router = Router();
const contenedor = setDb()
const contenedorProduct = contenedor.products

let admin = true;                      //editar para acceso a todas las rutas
//products
router.get('/', async (request, response) => {
    const productos = await contenedorProduct.getAll()
    if (productos.products.length != 0) {
        response.send({
            productos: productos.products
        })
    } else {
        response.send({
            productos: {
                message: "No hay productos agregados"
            }
        })
    }

})
router.get('/:pid', async (request, response) => {
    const id = parseInt(request.params.pid)
    let result = await contenedorProduct.getById(id)
    response.send(result)
})
router.post('/', uploader.single('image'), async (request, response) => {
    if (admin) {
        let thumbnail = ""
        if (request.file) {
            thumbnail = request.protocol + "://" + request.hostname + ":8080/images/" + request.file.filename
        }
        let product = request.body;
        if ((product.name && product.price) != '') {
            product.thumbnail = thumbnail;
            const result = await contenedorProduct.save(product)
            response.send({ product: result })
        } else {
            response.send({ status: "error", message: "incompleted values" })
        }
    }else{
        response.send({ status: "error", description: "unauthorized path for post method" })
    }
})
router.put('/:pid', async (request, response) => {
    if (admin) {
        const id = parseInt(request.params.pid)
        const productNew = request.body
        let result = await contenedorProduct.updateItem(productNew, id)
        response.send(result)
    } else {
        response.send({ status: "error", description: "unauthorized path for put method" })
    }

})
router.delete('/:pid', async (request, response) => {
    if (admin) {
        const id = parseInt(request.params.pid)
        let result = await contenedorProduct.deleteById(id)
        response.send(result)
    } else {
        response.send({ status: "error", description: "unauthorized path for delete method" })
    }

})

export default router;