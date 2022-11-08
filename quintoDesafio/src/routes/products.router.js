import { request, response, Router } from "express";
import Contenedor from "../Contenedor/contenedor.js";
import uploader from "../services/upload.js";

const router = Router();
const contenedor = new Contenedor()


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


export default router;