
import mongoose from 'mongoose'
const connectionMongo = () => {
    const connection = mongoose.connect('mongodb+srv://CoderUser:1234@codercluster.mwzreyn.mongodb.net/BasePrueba?retryWrites=true&w=majority', err => {
        if (err) console.log(err)
        else console.log("Base conectada")
    })
}

export default connectionMongo