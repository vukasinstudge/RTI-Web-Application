import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Kategorija = new Schema({
    ime: {
        type: String
    },
    obavestenja: {
        type: [{
            datum: {
                type: String
            },
            naslov: {
                type: String
            },
            sadrzaj: {
                type: String
            }
        }]
    }
});

export default mongoose.model('Kategorija', Kategorija, 'kategorije');