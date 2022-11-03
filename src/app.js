import express  from 'express';
import productosRouter from './routes/products.router.js';
import __dirName from './utils.js';

const app = express()

app.use(express.static(__dirName+'/public'));
app.use(express.json());

app.use('/api/productos', productosRouter);

app.listen(8080, ()=> console.log("Listening :$"));