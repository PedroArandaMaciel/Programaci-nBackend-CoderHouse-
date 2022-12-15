import containerCardFs from './containerCartFs.js'
import containerProductFs from './containerProductFs.js'
import containerCardMongo from './containerCartMongo.js'
import containerProductMongo from './containerProductMongo.js'
import mongoose from 'mongoose'

const persistencia = 'Mongo'  //Editar persistencia para cambiar DB. Mongo o Firebase



if (persistencia == "Mongo") {
    const connection = mongoose.connect('mongodb+srv://CoderUser:1234@codercluster.mwzreyn.mongodb.net/BasePrueba?retryWrites=true&w=majority', err => {
        if (err) console.log(err)
        else console.log("Base conectada")
    })
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