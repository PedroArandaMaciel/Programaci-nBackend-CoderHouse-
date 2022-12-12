import containerCardFs from './containerCardFs.js'
import containerProductFs from './containerProductFs.js'
//import containerCardMongo from './containerCardMongo.js'
//import containerProductMongo from './containerProductMongo.js'

const persistencia = 'Firebase'

export default function setDb(){
    switch (persistencia) {
        case 'Mongo':
            return {products : new containerProductMongo, carts : new containerCardMongo}
        case 'Firebase':
            return {products : new containerProductFs, carts : new containerCardFs} 
        default:
            return {products : new containerProductFs, carts : new containerCardFs}
    }
}