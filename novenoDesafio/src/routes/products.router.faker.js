import { Router } from "express";
import { generateProducts } from "../utils/mocks.js";


const router = Router();


router.get('/test', (req, res) => {
    let products = []
    for (let i = 0; i < 5; i++) {
        products.push(generateProducts())
    }
    res.render('productosfaker', {products})
})


export default router;