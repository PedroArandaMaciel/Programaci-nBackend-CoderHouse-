import express  from 'express';
import __dirName from './utils.js';
import productsRouter from './routes/views.router.fs.js';
import carritoRouter from './routes/views.router.carrito.fs.js'

const app = express()
const PORT = process.env.PORT||8080

app.use(express.static(__dirName+'/public'));
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', carritoRouter)


const server = app.listen(PORT, () => console.log('Listening Express'))