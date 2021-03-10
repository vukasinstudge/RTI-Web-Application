import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Mapiranje = new Schema({
    sifraPrikaz: {
        type: String
    },
    sifraMapiran: {
        type: String
    }
});

export default mongoose.model('Mapiranje', Mapiranje, 'mapiranja');