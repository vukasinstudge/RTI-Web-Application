"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.default = mongoose_1.default.model('Zaposleni', Zaposleni, 'zaposleni');
//# sourceMappingURL=zaposleni.js.map