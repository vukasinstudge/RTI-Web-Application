import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    korime: {
        type: String
    },
    lozinka: {
        type: String
    },
    tip: {
        type: String
    },
    promenioLozinku: {
        type: Number
    }
});

export default mongoose.model('Korisnik', Korisnik, 'korisnici');