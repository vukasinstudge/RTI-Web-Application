import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Admin = new Schema({
    korime: {
        type: String
    },
    lozinka: {
        type: String
    }
});

export default mongoose.model('Admin', Admin, 'admini');