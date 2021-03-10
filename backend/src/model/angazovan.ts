import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Angazovan = new Schema({
    korime: {
        type: String
    },
    sifra: {
        type: String
    },
    grupa: {
        type: String
    }
});

export default mongoose.model('Angazovan', Angazovan, 'angazovani');