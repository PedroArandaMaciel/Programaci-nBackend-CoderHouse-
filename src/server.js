import express, { response } from 'express';
import fs from 'fs';
import Contenedor from '../contenedor.js';

const app = express()
const server = app.listen(8080, () => console.log("Listening on Express"))

const returnProducts = (route) => {
    if (fs.existsSync(route)) {
        let data = fs.readFileSync(route, 'utf-8')
        let products = JSON.parse(data)
        return products;
    } else {
        return {
            status: "Error",
            message: "No route found"
        }
    }
}

app.get('/productos', (request, response) => {              //all the products
    response.send(returnProducts('./productos.json'))
})
app.get('/productoRandom', (request, response) => {         //random products
    let products = returnProducts('./productos.json')
    let numRandom = parseInt(Math.random() * products.length)
    if (!products.status) {
        response.send(products[numRandom])
    } else {
        response.send(products)
    }
})
app.get('/producto/:idProduct', (request, response) => {    //according to id entered
    const id = request.params.idProduct
    let products = returnProducts('./productos.json')
    let product = products.find((product) => product.id == id);
    if (product) {
        return {
            status: "Success",
            product: response.send(product)
        }
    } else {
        response.send({
            status: "Error",
            message: "Product not fount"
        })
    }
})
/**Test Routes
http://localhost:8080/productos
http://localhost:8080/productoRandom
http://localhost:8080/producto/1
 */


const contenedor = new Contenedor()
app.get('/saveM/:idProduct', (request, response) => {               //Add product from backing JSON
    let products = returnProducts('./backupProduct.json')
    const id = request.params.idProduct
    if (products[id]) {
        contenedor.save(products[id]).then((res) => response.send(res))
    } else {
        response.send({
            status: "Error",
            Message: "No product found"
        })
    }
})
app.get('/productoM/:idProduct', (request, response) => {           //according to id entered
    let id = request.params.idProduct
    contenedor.getById(id).then((res) => response.send(res))
})
app.get('/productosM', (request, response) => {                 //all the products
    contenedor.getAll().then((res) => response.send(res))
})
app.get('/deleteM/:idProduct', (request, response) => {         //delete according to id
    const id = request.params.idProduct
    contenedor.deleteById(id).then((res) => response.send(res))
})
app.get('/deleteObjectsM', (request, response) => {                 //delete all
    contenedor.deleteObj().then((res) => response.send(res))
})

/**Test Routes use class methods
http://localhost:8080/saveM/0
http://localhost:8080/productoM/1
http://localhost:8080/productosM
http://localhost:8080/deleteM/1
http://localhost:8080/deleteObjectsM
 */