import { request, response, Router } from "express";
import Contenedor from "../Contenedor/contenedor.js";
import uploader from "../services/upload.js";

const router = Router();
const contenedor = new Contenedor()

router.get('/', async (request, response) => {
    let result = await contenedor.getAll();
    response.send(result)
})
router.get('/:id', async (request, response) => {
    const id = request.params.id
    let result = await contenedor.getById(id)
    response.send(result)
})
router.post('/', uploader.single('image'), async (request, response) => {
    let image = ""
    if (request.file) {
        image = request.protocol + "://" + request.hostname + ":8080/images/" + request.file.filename
    }
    let product = request.body;
    if ((product.name && product.price) != '') {
        product.image = image;
        const result = await contenedor.save(product)
        response.send({ product: result })
    } else {
        response.send({ status: "error", message: "faltan completar campos obligatorios" })
    }
})
router.delete('/:id', async (request, response) => {
    const id = request.params.id
    let result = await contenedor.deleteById(id)
    response.send(result)
})
router.put('/:id', async (request, response) => {
    const id = request.params.id
    const productBody = request.body

    let result = await contenedor.updateItem(productBody, id)
    response.send(result)
})
export default router;