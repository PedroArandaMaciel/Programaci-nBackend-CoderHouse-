import express from 'express';
import productosRouter from './routes/views.router.js';
import __dirName from './dirname.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import Contenedor from './Contenedor/contenedorSQL.js';
import sqliteOpcions from './DB/knex.js';
import productsFaker from './routes/products.router.faker.js'

const contenedor = new Contenedor(sqliteOpcions, "products")
const arrayMsgServer = new Contenedor(sqliteOpcions, "messages")
const app = express()

app.use(express.static(__dirName + '/public'));
app.use(express.json());

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirName + '/views')
app.set('view engine', 'handlebars')
app.use('/', productosRouter);
app.use('/productos', productosRouter);
app.use('/chat', productosRouter)
app.use('/api/products', productsFaker)

const server = app.listen(8080, () => console.log('listening'));
const io = new Server(server)

const products = [];
const messages = [];
const readProducts = async () => {              //traer productos y mensajes del sv
    let data = await contenedor.getAll()
    data.forEach(pdt => {
        products.push(pdt)
    });
}
const readMessages = async () => {
    let data = await arrayMsgServer.getAll()
    data.forEach(msg => {
        messages.push(msg)
    })
}
readProducts();
readMessages();
io.on('connection', socket => {                 //conexion sv
    socket.emit('savedProducts', products)
    socket.on('addNew', data => {
        products.push(data)
        io.emit('savedProducts', products)
    })
    //chat
    socket.emit('logs', messages)
    socket.on('message', data => {
        if (data.emailUser != undefined) {
            messages.push(data)
            arrayMsgServer.save(data)
            io.emit('logs', messages)
        }
    })
    socket.on('authenticated', data => {
        console.log(`El usuario ${data.email} se pudo autenticar`)
        socket.broadcast.emit('newUserConnected', data.email)
    })
})
