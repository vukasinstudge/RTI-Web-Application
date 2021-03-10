import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Prati = new Schema({
    korime: {
        type: String
    },
    sifra: {
        type: String
    }
});

export default mongoose.model('Prati', Prati, 'prate');