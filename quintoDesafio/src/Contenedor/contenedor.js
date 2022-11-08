import fs from 'fs'
import __dirName from '../utils.js'

const pathToFile = __dirName + '/files/productos.json'

class Contenedor {
    save = async (product) => {
        if (!product.name || !product.price) {
            return {
                status: "Error",
                message: "Missing required fields"
            }
        }
        try {
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, "utf-8");
                let productos = JSON.parse(data);
                let id = productos.length + 1;
                product.id = id;
                productos.push(product)
                await fs.promises.writeFile(pathToFile, JSON.stringify(productos, null, 2))
                return {
                    status: "success",
                    message: "Product added successfully",
                    id: `Se le asigno el id ${id}`
                }
            } else {
                product.id = 1;
                await fs.promises.writeFile(pathToFile, JSON.stringify([product], null, 2));
                return {
                    status: "success",
                    message: "Product created successfully",
                    id: `Se le asigno el id 1`
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }
    getById = async (id) => {
        if (!id) {
            return {
                status: "Error",
                message: "ID is required"
            }
        }
        try {
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, "utf-8")
                let productos = JSON.parse(data)
                let product = productos.find((product) => product.id == id);
                if (product) {
                    return {
                        status: "Success",
                        product: product
                    }
                } else {
                    return {
                        status: "Error",
                        message: "Product not fount"
                    }
                }
            } else {
                return {
                    status: "Error",
                    message: "Route not found"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }
    getAll = async () => {
        try {
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, "utf-8")
                let productos = JSON.parse(data);
                return {
                    status: "success",
                    products: productos
                }
            } else {
                return {
                    status: "Error",
                    message: "Route not found"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }
    deleteById = async (id) => {
        if (!id) {
            return {
                status: "Error",
                message: "ID is required"
            }
        }
        try {
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, "utf-8")
                let productos = JSON.parse(data)
                if (productos.find(producto => producto.id == id)) {
                    let newProduct = productos.filter((product) => product.id != id);
                    await fs.promises.writeFile(pathToFile, JSON.stringify(newProduct, null, 2))
                    return {
                        status: "success",
                        message: "Product deleted successfully"
                    }
                } else {
                    return {
                        status: "Error",
                        Message: "Product not found"
                    }
                }
            } else {
                return {
                    status: "Error",
                    Message: "Route not found"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }
    deleteAll = async () => {
        try {
            if (fs.existsSync(pathToFile)) {
                fs.unlinkSync(pathToFile)
            } else {
                return {
                    status: "Error",
                    Message: "File not found"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }
    deleteObj = async () => {
        try {
            if (fs.existsSync(pathToFile)) {
                let newProd = [];
                await fs.promises.writeFile(pathToFile, JSON.stringify(newProd))
                return {
                    status: "success",
                    Message: "Deleted all products"
                }
            } else {
                return {
                    status: "Error",
                    Message: "File not found"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }
    updateItem = async (object, id) => {
        if (!id) {
            return {
                status: "Error",
                message: "ID is required"
            }
        }
        let products = await this.getAll()
        try {
            let arrayProducts = products.products.map(product => {
                if (product.id == id) {
                    return {
                        name: object.name ? object.name : product.name,
                        price: object.price ? object.price : product.price,
                        image: object.image ? object.image : product.image,
                        id: product.id
                    }
                } else {
                    return product
                }
            })
            let productUpdate = arrayProducts.find(product => product.id == id)
            if (productUpdate) {
                await fs.promises.writeFile(pathToFile, JSON.stringify(arrayProducts, null, 2))
                return {
                    status: "success",
                    message: "successfully upgraded product",
                    productNew: productUpdate
                }
            } else {
                return {
                    status: "error",
                    message: "Product not found"
                }
            }
        } catch {
            return products
        }
    }
}
export default Contenedor