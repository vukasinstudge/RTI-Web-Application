"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Predmet = new Schema({
    ime: {
        type: String
    },
    tip: {
        type: String
    },
    semestar: {
        type: Number
    },
    odsek: {
        type: String
    },
    sifra: {
        type: String
    },
    fondPredavanja: {
        type: Number
    },
    fondVezbe: {
        type: String
    },
    espb: {
        type: Number
    },
    cilj: {
        type: String
    },
    terminPredavanja: {
        type: String
    },
    terminVezbe: {
        type: String
    },
    polaganje: {
        type: String
    },
    komentar: {
        type: String
    },
    predavanja: {
        type: [Object]
    },
    vezbe: {
        type: [Object]
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
                },
                dodaci: {
                    type: [Object]
                },
                napisao: {
                    type: String
                }
            }]
    },
    ispitnaPitanja: {
        type: {
            rokovi: {
                type: [Object]
            },
            resenja: {
                type: [Object]
            },
            otkljucano: {
                type: Boolean
            }
        }
    },
    labovi: {
        type: {
            brojLabova: {
                type: Number
            },
            osnovneInformacije: {
                type: String
            },
            otkljucano: {
                type: Boolean
            },
            labovi: {
                type: [{
                        labNaziv: {
                            type: String
                        },
                        labMaterijal: {
                            type: [Object]
                        }
                    }]
            }
        }
    },
    domaci: {
        type: {
            otkljucano: {
                type: Boolean
            },
            domaciZadaci: {
                type: [{
                        informacije: {
                            type: String
                        },
                        domaciMaterijal: {
                            type: [Object]
                        }
                    }]
            }
        }
    },
    brojGrupa: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Predmet', Predmet, 'predmeti');
//# sourceMappingURL=predmet.js.map