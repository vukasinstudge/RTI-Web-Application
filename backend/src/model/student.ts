import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Student = new Schema({
    korime: {
        type: String
    },
    lozinka: {
        type: String
    },
    indeks: {
        type: String
    },
    tipStudija: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    status: {
        type: String
    },
});

export default mongoose.model('Student', Student, 'studenti');