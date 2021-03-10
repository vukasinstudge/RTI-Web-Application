import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const Spisak = new Schema({
    otvorio: {
        type: String
    },
    ime: {
        type: String
    },
    termin: {
        type: String
    },
    mesto: {
        type: String
    },
    limit: {
        type: Number
    },
    datum: {
        type: String
    },
    obaveza: {
        type: String
    },
    nazivObaveze: {
        type: String
    },
    sifra: {
        type: String
    },
    studenti: {
        type: [{
            korime: {
                type: String
            },
            rad: {
                type: Object
            }
        }]
    }
});

export default mongoose.model('Spisak', Spisak, 'spiskovi');