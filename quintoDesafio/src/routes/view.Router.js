import {Router} from "express";
import Contenedor from "../Contenedor/contenedor.js";
const router = Router()

const contenedor = new Contenedor()
router.get('/productos',async (request, response) => {
    const productos = await contenedor.getAll()
    if(productos.products.length != 0 ){
        response.render('productos',{
            productos
        })
    }else{
        response.render('productos',{
            mensaje:"No hay productos agregados"
        })
    }

})

export default router