import containerCardFs from './containerCartFs.js'
import containerProductFs from './containerProductFs.js'
import containerCardMongo from './containerCartMongo.js'
import containerProductMongo from './containerProductMongo.js'
import connectionMongo from '../config.js'

const persistencia = 'Firebase'  //Editar persistencia para cambiar DB. Mongo o Firebase



if (persistencia == "Mongo") {
    connectionMongo()
}
export default function setDb() {
    switch (persistencia) {
        case 'Mongo':
            return { products: new containerProductMongo, carts: new containerCardMongo }
        case 'Firebase':
            return { products: new containerProductFs, carts: new containerCardFs }
        default:
            return { products: new containerProductFs, carts: new containerCardFs }
    }
}