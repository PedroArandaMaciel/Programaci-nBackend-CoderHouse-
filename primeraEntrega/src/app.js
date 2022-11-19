import express  from 'express';
import __dirName from './utils.js';
import handlebars from 'express-handlebars'
import productsRouter from './routes/views.router.js';
import carritoRouter from './routes/views.router.carrito.js'

const app = express()
const PORT = process.env.PORT||8080

app.use(express.static(__dirName+'/public'));
app.use(express.json());
//handlebars
app.engine('handlebars', handlebars.engine())           
app.set('views', __dirName + '/views')                  
app.set('view engine', 'handlebars')     

app.use('/api/products', productsRouter);
app.use('/api/carrito', carritoRouter)


const server = app.listen(PORT, () => console.log('Listening'))