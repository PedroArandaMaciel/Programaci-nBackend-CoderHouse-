import fs from 'fs'

const pathToFile = './productos.json'

class Contenedor {
    save = async (product) => {
        if (!product.nombre || !product.stock || !product.marca) {
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
                    message: "No products found"
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
                    message: "No products found"
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
                let newProduct = productos.filter((product) => product.id != id);
                await fs.promises.writeFile(pathToFile, JSON.stringify(newProduct, null, 2))
                return {
                    status: "success",
                    message: "Product deleted successfully"
                }
            } else {
                return {
                    status: "Error",
                    Message: "No product found"
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
                    Message: "No file found"
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
                    Message: "No file found"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }
}
export default  Contenedor