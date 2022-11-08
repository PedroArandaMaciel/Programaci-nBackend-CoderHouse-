import express, { request, response }  from 'express';
import productosRouter from './routes/products.router.js';
import __dirName from './utils.js';
import handlebars from 'express-handlebars'

const app = express()

app.use(express.static(__dirName+'/public'));
app.use(express.json());

        //Motores de plantillas
// ¡ATENCION! Cambiar en productos.router (linea 11 y 15) el view a renderizar y descomentar abajo (segun corresponda el motor de plantilla)

//handlebars
app.engine('handlebars', handlebars.engine())           //-registro, hace referencia al motor a utilizar (solo en handlebars)
app.set('views', __dirName + '/views')                  //le damos una ruta absoluta con __dirname. Concectar con la carpeta de vistas
app.set('view engine', 'handlebars')                    //-Activo el motor registrado
app.use('/', productosRouter);
app.use('/productos', productosRouter);


//pug 
///app.set('views', __dirName + '/views')
///app.set('view engine', 'pug')
///app.use('/', productosRouter);
///app.use('/productos', productosRouter);

//Ejs
///app.set('views', __dirName + '/views')
///app.set('view engine', 'ejs')
///app.use('/', productosRouter);
///app.use('/productos', productosRouter);

app.listen(8080, ()=> console.log("Listening"));