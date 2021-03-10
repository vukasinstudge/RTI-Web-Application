"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.default = mongoose_1.default.model('Spisak', Spisak, 'spiskovi');
//# sourceMappingURL=spisak.js.map