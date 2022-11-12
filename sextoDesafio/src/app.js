import express, { request, response }  from 'express';
import productosRouter from './routes/products.router.js';
import __dirName from './utils.js';
import handlebars from 'express-handlebars'
import { Server, Socket } from 'socket.io';

const app = express()

app.use(express.static(__dirName+'/public'));
app.use(express.json());

//handlebars
app.engine('handlebars', handlebars.engine())           
app.set('views', __dirName + '/views')                  
app.set('view engine', 'handlebars')                    
app.use('/', productosRouter);
app.use('/productos', productosRouter);



const server = app.listen(8080, ()=>console.log('listening'));
const io = new Server(server)

const products = [];
io.on('connection', socket => {             //conexion sv
    socket.emit('savedProducts', products)

    socket.on('addNew', data => {
        products.push(data)
        io.emit('savedProducts', products)
    })
})