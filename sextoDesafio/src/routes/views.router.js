import { request, response, Router } from "express";
import Contenedor from "../Contenedor/contenedor.js";
import uploader from "../services/upload.js";

const router = Router();
const contenedor = new Contenedor()
//products
router.get('/productos', async (request, response) => {
    const productos = await contenedor.getAll()
    if (productos.products.length != 0) {
        response.render('productos', {        
            productos
        })
    } else {
        response.render('productos', {    
            productos : {
                mensaje: "No hay productos agregados"
            }
        })
    }

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

//chat
router.get('/', (req, res) => {
    res.render('chat');
})

export default router;