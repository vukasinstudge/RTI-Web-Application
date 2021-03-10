"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.default = mongoose_1.default.model('Kategorija', Kategorija, 'kategorije');
//# sourceMappingURL=kategorija.js.map