import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Zaposleni = new Schema({
    korime: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    adresa: {
        type: String
    },
    telefon: {
        type: String
    },
    sajt: {
        type: String
    },
    biografija: {
        type: String
    },
    zvanje: {
        type: String
    },
    brojKabineta: {
        type: Number
    },
    status: {
        type: String
    },
    slika: {
        type: String
    },
});

export default mongoose.model('Zaposleni', Zaposleni, 'zaposleni');