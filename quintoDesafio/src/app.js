import express, { request, response }  from 'express';
import productosRouter from './routes/products.router.js';
import __dirName from './utils.js';
import handlebars from 'express-handlebars'
import viewsRouter from './routes/view.Router.js'

const app = express()

app.use(express.static(__dirName+'/public'));
app.use(express.json());
app.use('/productos', productosRouter);


//Motor de plantillas
//-registro, hace referencia al motor a utilizar
app.engine('handlebars', handlebars.engine())
//-concectar con la carpeta de vistas
app.set('views', __dirName + '/views') //le damos una ruta absoluta con __dirname
//-Activo el motor registrado
app.set('view engine', 'handlebars')

app.use('/', viewsRouter);





app.listen(8080, ()=> console.log("Listening"));