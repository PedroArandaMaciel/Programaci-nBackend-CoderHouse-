import express  from 'express';
import productosRouter from './routes/views.router.js';
import __dirName from './utils.js';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import Contenedor from './Contenedor/contenedor.js';
import contenedorMsg from './Contenedor/contenedorMsg.js';

const contenedor = new Contenedor()
const arrayMsgServer = new contenedorMsg()
const app = express()

app.use(express.static(__dirName+'/public'));
app.use(express.json());

//handlebars
app.engine('handlebars', handlebars.engine())           
app.set('views', __dirName + '/views')                  
app.set('view engine', 'handlebars')                    
app.use('/', productosRouter);
app.use('/productos', productosRouter);
app.use('/chat', productosRouter)

const server = app.listen(8080, ()=>console.log('listening'));
const io = new Server(server)


const products = [];
const messages = [];
const readProducts = async () => {              //traer productos y mensajes del sv
    let data = await contenedor.getAll()
    data.products.forEach(pdt => {
        products.push(pdt)
    });
}
const readMessages = async () => {
    let data = await arrayMsgServer.getAllMsgs()
    data.messages.forEach(msg => {
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
        if (data.emailUser != undefined){
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
