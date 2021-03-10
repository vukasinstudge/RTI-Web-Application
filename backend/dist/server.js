"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const korisnik_1 = __importDefault(require("./model/korisnik"));
const student_1 = __importDefault(require("./model/student"));
const admin_1 = __importDefault(require("./model/admin"));
const zaposleni_1 = __importDefault(require("./model/zaposleni"));
const predmet_1 = __importDefault(require("./model/predmet"));
const angazovan_1 = __importDefault(require("./model/angazovan"));
const fs = __importStar(require("fs"));
const spisak_1 = __importDefault(require("./model/spisak"));
const prati_1 = __importDefault(require("./model/prati"));
const kategorija_1 = __importDefault(require("./model/kategorija"));
const mapiranje_1 = __importDefault(require("./model/mapiranje"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/rti', { useNewUrlParser: true });
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log('mongo open');
});
const router = express_1.default.Router();
router.route('/prijava').post((req, res) => {
    let korime = req.body.korime;
    korisnik_1.default.findOne({ 'korime': korime }, (err, korisnik) => {
        if (err)
            console.log(err);
        else
            res.json(korisnik);
    });
});
router.route('/dodajStudenta').post((req, res) => {
    let korime = req.body.korime;
    let lozinka = req.body.lozinka;
    let indeks = req.body.indeks;
    let tipStudija = req.body.tipStudija;
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let status = req.body.status;
    student_1.default.collection.insertOne({ 'korime': korime, 'lozinka': lozinka, 'indeks': indeks, 'tipStudija': tipStudija, 'ime': ime, 'prezime': prezime, 'status': status });
    res.json({ poruka: 1 });
});
router.route('/dodajKorisnika').post((req, res) => {
    let korime = req.body.korime;
    let lozinka = req.body.lozinka;
    let tip = req.body.tip;
    let promenioLozinku = req.body.promenioLozinku;
    korisnik_1.default.collection.insertOne({ 'korime': korime, 'lozinka': lozinka, 'tip': tip, 'promenioLozinku': promenioLozinku });
    res.json({ poruka: 1 });
});
router.route('/dohvatiStudenta').post((req, res) => {
    let korime = req.body.korime;
    student_1.default.findOne({ 'korime': korime }, (err, student) => {
        if (err)
            console.log(err);
        else
            res.json(student);
    });
});
router.route('/dohvatiAdmina').post((req, res) => {
    let korime = req.body.korime;
    admin_1.default.findOne({ 'korime': korime }, (err, admin) => {
        if (err)
            console.log(err);
        else
            res.json(admin);
    });
});
router.route('/dohvatiZaposlenog').post((req, res) => {
    let korime = req.body.korime;
    zaposleni_1.default.findOne({ 'korime': korime }, (err, zaposleni) => {
        if (err)
            console.log(err);
        else
            res.json(zaposleni);
    });
});
router.route('/dodajZaposlenog').post((req, res) => {
    let korime = req.body.korime;
    let lozinka = req.body.lozinka;
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let adresa = req.body.adresa;
    let telefon = req.body.telefon;
    let sajt = req.body.sajt;
    let biografija = req.body.biografija;
    let zvanje = req.body.zvanje;
    let brojKabineta = req.body.brojKabineta;
    let status = req.body.status;
    let slika = req.body.slika;
    zaposleni_1.default.collection.insertOne({ 'korime': korime, 'lozinka': lozinka, 'ime': ime, 'prezime': prezime, 'adresa': adresa, 'telefon': telefon, 'sajt': sajt, 'biografija': biografija, 'zvanje': zvanje, 'brojKabineta': brojKabineta, 'status': status, 'slika': slika });
    res.json({ poruka: 1 });
});
router.route('/promeniLozinku').post((req, res) => {
    let korime = req.body.korime;
    let nova = req.body.nova;
    let tip = req.body.tip;
    korisnik_1.default.collection.updateOne({ "korime": korime }, { $set: { "lozinka": nova, "promenioLozinku": 1 } });
    if (tip == "zaposleni")
        zaposleni_1.default.collection.updateOne({ "korime": korime }, { $set: { "lozinka": nova } });
    if (tip == "student")
        student_1.default.collection.updateOne({ "korime": korime }, { $set: { "lozinka": nova } });
    if (tip == "admin")
        admin_1.default.collection.updateOne({ "korime": korime }, { $set: { "lozinka": nova } });
    res.json({ poruka: 1 });
});
router.route('/dohvatiZaposlene').get((req, res) => {
    zaposleni_1.default.find({}, (err, zaposleni) => {
        if (err)
            console.log(err);
        else
            res.json(zaposleni);
    });
});
router.route('/dohvatiSveKorisnike').get((req, res) => {
    korisnik_1.default.find({}, (err, korisnici) => {
        if (err)
            console.log(err);
        else
            res.json(korisnici);
    });
});
router.route('/obrisiKorisnika').post((req, res) => {
    let korime = req.body.korime;
    let tip = req.body.tip;
    korisnik_1.default.collection.deleteOne({ "korime": korime });
    if (tip == "zaposleni")
        zaposleni_1.default.collection.deleteOne({ "korime": korime });
    if (tip == "student")
        student_1.default.collection.deleteOne({ "korime": korime });
    res.json({ poruka: 1 });
});
router.route('/azurirajKorisnika').post((req, res) => {
    let staroKorime = req.body.staroKorime;
    let korime = req.body.korime;
    let lozinka = req.body.lozinka;
    korisnik_1.default.collection.updateOne({ "korime": staroKorime }, { $set: { "korime": korime, "lozinka": lozinka } });
    res.json({ poruka: 1 });
});
router.route('/azurirajStudenta').post((req, res) => {
    let staroKorime = req.body.staroKorime;
    let korime = req.body.korime;
    let lozinka = req.body.lozinka;
    let indeks = req.body.indeks;
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let tipStudija = req.body.tipStudija;
    let status = req.body.status;
    student_1.default.collection.updateOne({ "korime": staroKorime }, { $set: { "korime": korime, "lozinka": lozinka, "indeks": indeks, "ime": ime, "prezime": prezime, "tipStudija": tipStudija, "status": status } });
    res.json({ poruka: 1 });
});
router.route('/azurirajZaposlenog').post((req, res) => {
    let staroKorime = req.body.staroKorime;
    let korime = req.body.korime;
    let lozinka = req.body.lozinka;
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let adresa = req.body.adresa;
    let telefon = req.body.telefon;
    let sajt = req.body.sajt;
    let biografija = req.body.biografija;
    let zvanje = req.body.zvanje;
    let brojKabineta = req.body.brojKabineta;
    let status = req.body.status;
    zaposleni_1.default.collection.updateOne({ "korime": staroKorime }, { $set: { "korime": korime, "lozinka": lozinka, "ime": ime, "prezime": prezime, "adresa": adresa, "telefon": telefon, "sajt": sajt, "biografija": biografija, "zvanje": zvanje, "brojKabineta": brojKabineta, "status": status } });
    res.json({ poruka: 1 });
});
router.route('/dohvatiPredmete').post((req, res) => {
    let odsek = req.body.odsek;
    let semestar = req.body.semestar;
    predmet_1.default.find({ "odsek": odsek, "semestar": semestar }, (err, predmeti) => {
        if (err)
            console.log(err);
        else
            res.json(predmeti);
    });
});
router.route('/unosPredmeta').post((req, res) => {
    let imePredmeta = req.body.imePredmeta;
    let tip = req.body.tip;
    let semestar = req.body.semestar;
    let odsek = req.body.odsek;
    let sifra = req.body.sifra;
    let fondPredavanja = req.body.fondPredavanja;
    let fondVezbe = req.body.fondVezbe;
    let espb = req.body.espb;
    let cilj = req.body.cilj;
    let terminPredavanja = req.body.terminPredavanja;
    let terminVezbe = req.body.terminVezbe;
    let polaganje = req.body.polaganje;
    let komentar = req.body.komentar;
    let brojGrupa = req.body.brojGrupa;
    let predavanja = new Array();
    let vezbe = new Array();
    let obavestenja = new Array();
    let ispitnaPitanja = {
        rokovi: new Array(),
        resenja: new Array(),
        otkljucano: true
    };
    let labovi = {
        brojLabova: 0,
        osnovneInformacije: "",
        otkljucano: true,
        labovi: new Array()
    };
    let domaci = {
        otkljucano: true,
        domaciZadaci: new Array()
    };
    predmet_1.default.collection.insertOne({ 'ime': imePredmeta, 'tip': tip, 'semestar': semestar, 'odsek': odsek, 'sifra': sifra, 'fondPredavanja': fondPredavanja, 'fondVezbe': fondVezbe, 'espb': espb, 'cilj': cilj, 'terminPredavanja': terminPredavanja, 'terminVezbe': terminVezbe, 'polaganje': polaganje, 'komentar': komentar, 'predavanja': predavanja, 'vezbe': vezbe, 'obavestenja': obavestenja, 'ispitnaPitanja': ispitnaPitanja, 'labovi': labovi, 'domaci': domaci, 'brojGrupa': brojGrupa });
    res.json({ poruka: 1 });
});
router.route('/dohvatiSvePredmete').get((req, res) => {
    predmet_1.default.find({}, (err, predmeti) => {
        if (err)
            console.log(err);
        else
            res.json(predmeti);
    });
});
router.route('/obrisiPredmet').post((req, res) => {
    let sifra = req.body.sifra;
    predmet_1.default.collection.deleteOne({ "sifra": sifra });
    res.json({ poruka: 1 });
});
router.route('/dohvatiPredmetSifra').post((req, res) => {
    let sifra = req.body.sifra;
    predmet_1.default.findOne({ 'sifra': sifra }, (err, predmet) => {
        if (err)
            console.log(err);
        else
            res.json(predmet);
    });
});
router.route('/azurirajPredmetAdmin').post((req, res) => {
    let staraSifra = req.body.staraSifra;
    let ime = req.body.ime;
    let tip = req.body.tip;
    let semestar = req.body.semestar;
    let odsek = req.body.odsek;
    let sifra = req.body.sifra;
    let fondPredavanja = req.body.fondPredavanja;
    let fondVezbe = req.body.fondVezbe;
    let espb = req.body.espb;
    let cilj = req.body.cilj;
    let terminPredavanja = req.body.terminPredavanja;
    let terminVezbe = req.body.terminVezbe;
    let polaganje = req.body.polaganje;
    let komentar = req.body.komentar;
    let brojGrupa = req.body.brojGrupa;
    predmet_1.default.collection.updateOne({ "sifra": staraSifra }, { $set: { "ime": ime, "tip": tip, "semestar": semestar, "odsek": odsek, "sifra": sifra, "fondPredavanja": fondPredavanja, "fondVezbe": fondVezbe, "espb": espb, "cilj": cilj, "terminPredavanja": terminPredavanja, "terminVezbe": terminVezbe, "polaganje": polaganje, "komentar": komentar, "brojGrupa": brojGrupa } });
    res.json({ poruka: 1 });
});
router.route('/dohvatiProfesore').get((req, res) => {
    zaposleni_1.default.find({ "zvanje": "redovni profesor" }, (err, zaposleni) => {
        if (err)
            console.log(err);
        else
            res.json(zaposleni);
    });
});
router.route('/dohvatiAsistente').get((req, res) => {
    zaposleni_1.default.find({ "zvanje": "asistent" }, (err, zaposleni) => {
        if (err)
            console.log(err);
        else
            res.json(zaposleni);
    });
});
router.route('/dohvatiVanredne').get((req, res) => {
    zaposleni_1.default.find({ "zvanje": "vanredni profesor" }, (err, zaposleni) => {
        if (err)
            console.log(err);
        else
            res.json(zaposleni);
    });
});
router.route('/dohvatiDocente').get((req, res) => {
    zaposleni_1.default.find({ "zvanje": "docent" }, (err, zaposleni) => {
        if (err)
            console.log(err);
        else
            res.json(zaposleni);
    });
});
router.route('/dohvatiPredmet').post((req, res) => {
    let sifra = req.body.sifra;
    predmet_1.default.findOne({ 'sifra': sifra }, (err, predmet) => {
        if (err)
            console.log(err);
        else
            res.json(predmet);
    });
});
router.route('/angazujZaposlenog').post((req, res) => {
    let korime = req.body.korime;
    let sifra = req.body.sifra;
    let grupa = req.body.grupa;
    angazovan_1.default.collection.insertOne({ 'korime': korime, 'sifra': sifra, 'grupa': grupa });
    res.json({ poruka: 1 });
});
router.route('/dohvatiSveAngazovane').get((req, res) => {
    angazovan_1.default.find({}, (err, angazovan) => {
        if (err)
            console.log(err);
        else
            res.json(angazovan);
    });
});
router.route('/obrisiAngazman').post((req, res) => {
    let korime = req.body.korime;
    let sifra = req.body.sifra;
    let grupa = req.body.grupa;
    angazovan_1.default.collection.deleteOne({ "korime": korime, "sifra": sifra, "grupa": grupa });
    res.json({ poruka: 1 });
});
router.route('/dohvatiNastavnike').post((req, res) => {
    let sifra = req.body.sifra;
    angazovan_1.default.find({ "sifra": sifra }, (err, angazovani) => {
        if (err)
            console.log(err);
        else
            res.json(angazovani);
    });
});
router.route('/dohvatiNastavnikPredmete').post((req, res) => {
    let korime = req.body.korime;
    angazovan_1.default.find({ "korime": korime }, (err, angazovani) => {
        if (err)
            console.log(err);
        else
            res.json(angazovani);
    });
});
router.route('/azurirajOsnovneInformacije').post((req, res) => {
    let osnovneInformacije = req.body.osnovneInformacije;
    let sifra = req.body.sifra;
    predmet_1.default.collection.updateOne({ "sifra": sifra }, { $set: { "labovi.osnovneInformacije": osnovneInformacije } });
    res.json({ poruka: 1 });
});
router.route('/azurirajNazivLaba').post((req, res) => {
    let labNazivStari = req.body.labNazivStari;
    let labNaziv = req.body.labNaziv;
    let sifra = req.body.sifra;
    predmet_1.default.collection.updateOne({ "sifra": sifra }, { $set: { "labovi.labovi.$[indeks].labNaziv": labNaziv } }, { arrayFilters: [{ "indeks.labNaziv": labNazivStari }] });
    res.json({ poruka: 1 });
});
router.route('/obrisiLab').post((req, res) => {
    let labNaziv = req.body.labNaziv;
    let sifra = req.body.sifra;
    predmet_1.default.collection.updateOne({ "sifra": sifra }, { $pull: { "labovi.labovi": { "labNaziv": labNaziv } } });
    predmet_1.default.collection.updateOne({ "sifra": sifra }, { $inc: { "labovi.brojLabova": -1 } });
    res.json({ poruka: 1 });
});
router.route('/dodajLab').post((req, res) => {
    let noviLabNaziv = req.body.noviLabNaziv;
    let sifra = req.body.sifra;
    let noviLab = {
        labNaziv: noviLabNaziv,
        labMaterijal: new Array()
    };
    predmet_1.default.collection.updateOne({ 'sifra': sifra }, { $push: { 'labovi.labovi': noviLab } });
    predmet_1.default.collection.updateOne({ "sifra": sifra }, { $inc: { "labovi.brojLabova": 1 } });
    res.json({ poruka: 1 });
});
router.route('/azurirajInformacijeDomaceg').post((req, res) => {
    let informacijeDomaciStare = req.body.informacijeDomaciStare;
    let informacijeDomaci = req.body.informacijeDomaci;
    let sifra = req.body.sifra;
    predmet_1.default.collection.updateOne({ "sifra": sifra }, { $set: { "domaci.domaciZadaci.$[indeks].informacije": informacijeDomaci } }, { arrayFilters: [{ "indeks.informacije": informacijeDomaciStare }] });
    res.json({ poruka: 1 });
});
router.route('/obrisiDomaci').post((req, res) => {
    let informacijeDomaci = req.body.informacijeDomaci;
    let sifra = req.body.sifra;
    predmet_1.default.collection.updateOne({ "sifra": sifra }, { $pull: { "domaci.domaciZadaci": { "informacije": informacijeDomaci } } });
    res.json({ poruka: 1 });
});
router.route('/dodajDomaci').post((req, res) => {
    let informacijeNoviDomaci = req.body.informacijeNoviDomaci;
    let sifra = req.body.sifra;
    let noviDomaci = {
        informacije: informacijeNoviDomaci,
        domaciMaterijal: new Array()
    };
    predmet_1.default.collection.updateOne({ 'sifra': sifra }, { $push: { 'domaci.domaciZadaci': noviDomaci } });
    res.json({ poruka: 1 });
});
router.route('/azurirajVidljivoIspitna').post((req, res) => {
    let sifra = req.body.sifra;
    let vidljiva = req.body.vidljiva;
    predmet_1.default.collection.updateOne({ "sifra": sifra }, { $set: { "ispitnaPitanja.otkljucano": vidljiva } });
    res.json({ poruka: 1 });
});
router.route('/azurirajVidljivoLaboratorija').post((req, res) => {
    let sifra = req.body.sifra;
    let vidljiva = req.body.vidljiva;
    predmet_1.default.collection.updateOne({ "sifra": sifra }, { $set: { "labovi.otkljucano": vidljiva } });
    res.json({ poruka: 1 });
});
router.route('/azurirajVidljivoDomaci').post((req, res) => {
    let sifra = req.body.sifra;
    let vidljiva = req.body.vidljiva;
    predmet_1.default.collection.updateOne({ "sifra": sifra }, { $set: { "domaci.otkljucano": vidljiva } });
    res.json({ poruka: 1 });
});
router.route('/unesiObavestenje').post((req, res) => {
    let datum = req.body.datum;
    let naslov = req.body.naslov;
    let sadrzaj = req.body.sadrzaj;
    let napisao = req.body.napisao;
    let sifra = req.body.sifra;
    let dodatiFajlovi = req.body.dodatiFajlovi;
    let novoObavestenje = {
        datum: datum,
        naslov: naslov,
        sadrzaj: sadrzaj,
        dodaci: new Array(),
        napisao: napisao
    };
    predmet_1.default.collection.updateOne({ 'sifra': sifra }, { $push: { 'obavestenja': novoObavestenje } });
    res.json({ poruka: 1 });
});
router.route('/azurirajObavestenje').post((req, res) => {
    let obavestenjaNaslovStari = req.body.obavestenjaNaslovStari;
    let obavestenjaNaslov = req.body.obavestenjaNaslov;
    let obavestenjaSadrzajStari = req.body.obavestenjaSadrzajStari;
    let obavestenjaSadrzaj = req.body.obavestenjaSadrzaj;
    let sifra = req.body.sifra;
    predmet_1.default.collection.updateOne({ "sifra": sifra }, { $set: { "obavestenja.$[indeks].naslov": obavestenjaNaslov, "obavestenja.$[indeks].sadrzaj": obavestenjaSadrzaj } }, { arrayFilters: [{ "indeks.naslov": obavestenjaNaslovStari, "indeks.sadrzaj": obavestenjaSadrzajStari }] });
    res.json({ poruka: 1 });
});
router.route('/obrisiObavestenje').post((req, res) => {
    let obavestenjaNaslov = req.body.obavestenjaNaslov;
    let obavestenjaSadrzaj = req.body.obavestenjaSadrzaj;
    let sifra = req.body.sifra;
    predmet_1.default.collection.updateOne({ "sifra": sifra }, { $pull: { "obavestenja": { "naslov": obavestenjaNaslov, "sadrzaj": obavestenjaSadrzaj } } });
    res.json({ poruka: 1 });
});
// FAJLOVI --------------------------------------------------------------------
const fajloviKorisnika = '../backend/user_upload/';
app.set('views', './dist/browser');
var path = require('path');
app.delete('/fajlovi/**', (req, res) => {
    const imeFajla = req.url.substring(9).replace(/%20/g, ' ');
    fs.unlink(fajloviKorisnika + imeFajla, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else {
            res.status(204);
            res.send({});
        }
    });
});
router.route('/obrisiFajlPredmet').post((req, res) => {
    let sekcija = req.body.sekcija;
    let ime = req.body.ime;
    let sifra = req.body.sifra;
    if (sekcija.charAt(0) == 'l' && sekcija.charAt(1) == '.') {
        let labNaziv = sekcija.split('.')[1];
        predmet_1.default.collection.updateOne({ "sifra": sifra }, { $pull: { "labovi.labovi.$[indeks].labMaterijal": { 'ime': ime } } }, { arrayFilters: [{ "indeks.labNaziv": labNaziv }] });
    }
    if (sekcija.charAt(0) == 'd' && sekcija.charAt(1) == '.') {
        let informacije = sekcija.split('.')[1];
        predmet_1.default.collection.updateOne({ "sifra": sifra }, { $pull: { "domaci.domaciZadaci.$[indeks].domaciMaterijal": { 'ime': ime } } }, { arrayFilters: [{ "indeks.informacije": informacije }] });
    }
    if (sekcija == 'predavanja')
        predmet_1.default.collection.updateOne({ 'sifra': sifra }, { $pull: { 'predavanja': { 'ime': ime } } });
    if (sekcija == 'vezbe')
        predmet_1.default.collection.updateOne({ 'sifra': sifra }, { $pull: { 'vezbe': { 'ime': ime } } });
    if (sekcija == 'rokovi')
        predmet_1.default.collection.updateOne({ 'sifra': sifra }, { $pull: { 'ispitnaPitanja.rokovi': { 'ime': ime } } });
    if (sekcija == 'resenja')
        predmet_1.default.collection.updateOne({ 'sifra': sifra }, { $pull: { 'ispitnaPitanja.resenja': { 'ime': ime } } });
    res.json({ poruka: 1 });
});
app.put('/fajlovi', (req, res) => {
    const fajl = req.body;
    const noviFajl = req.body.noviFajl;
    const sifra = req.body.sifra;
    const sekcija = req.body.sekcija;
    const spisakObjekat = req.body.spisakObjekat;
    const base64data = fajl.sadrzaj.replace(/^data:.*,/, '');
    fs.writeFile(fajloviKorisnika + fajl.imeFajla, base64data, 'base64', (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else {
            var stats = fs.statSync(fajloviKorisnika + fajl.imeFajla);
            noviFajl.kb = Math.round(stats.size / 1024);
            noviFajl.tip = ((path.extname(fajl.imeFajla)).substring(1)).toUpperCase();
            if (sekcija.charAt(0) == 'l' && sekcija.charAt(1) == '.') {
                let labNaziv = sekcija.split('.')[1];
                predmet_1.default.collection.updateOne({ "sifra": sifra }, { $push: { "labovi.labovi.$[indeks].labMaterijal": noviFajl } }, { arrayFilters: [{ "indeks.labNaziv": labNaziv }] });
            }
            if (sekcija.charAt(0) == 'd' && sekcija.charAt(1) == '.') {
                let informacije = sekcija.split('.')[1];
                predmet_1.default.collection.updateOne({ "sifra": sifra }, { $push: { "domaci.domaciZadaci.$[indeks].domaciMaterijal": noviFajl } }, { arrayFilters: [{ "indeks.informacije": informacije }] });
            }
            if (sekcija == "spiskoviLab" || sekcija == "spiskoviDomaci") {
                let korime = sifra;
                spisak_1.default.collection.updateOne({ 'otvorio': spisakObjekat.otvorio, 'naziv': spisakObjekat.naziv, 'termin': spisakObjekat.termin, 'mesto': spisakObjekat.mesto, 'limit': spisakObjekat.limit, 'datum': spisakObjekat.datum, 'obaveza': spisakObjekat.obaveza, 'nazivObaveze': spisakObjekat.nazivObaveze, 'sifra': spisakObjekat.sifra }, { $set: { "studenti.$[indeks].rad": noviFajl } }, { arrayFilters: [{ "indeks.korime": korime }] });
            }
            if (sekcija == "obavestenje") {
                predmet_1.default.collection.updateOne({ "sifra": sifra }, { $push: { "obavestenja.$[indeks].dodaci": noviFajl } }, { arrayFilters: [{ "indeks.naslov": spisakObjekat }] });
            }
            if (sekcija == 'predavanja')
                predmet_1.default.collection.updateOne({ 'sifra': sifra }, { $push: { 'predavanja': noviFajl } });
            if (sekcija == 'vezbe')
                predmet_1.default.collection.updateOne({ 'sifra': sifra }, { $push: { 'vezbe': noviFajl } });
            if (sekcija == 'rokovi')
                predmet_1.default.collection.updateOne({ 'sifra': sifra }, { $push: { 'ispitnaPitanja.rokovi': noviFajl } });
            if (sekcija == 'resenja')
                predmet_1.default.collection.updateOne({ 'sifra': sifra }, { $push: { 'ispitnaPitanja.resenja': noviFajl } });
            res.set('Location', fajloviKorisnika + fajl.imeFajla);
            res.status(200);
            res.send(fajl);
        }
    });
});
app.get('/fajlovi/**', (request, response) => {
    const imeFajla = request.url.substring(9).replace(/%20/g, ' ');
    const imeFajlaDown = request.url.substring(7).replace(/%20/g, ' ');
    const file = `${fajloviKorisnika}/${imeFajla}`;
    response.download(file, function (err) {
    });
});
// PROMENA SLIKE ----------------------------------------------------------------------------------------------------------
router.route('/promeniSliku').post((req, res) => {
    let korime = req.body.korime;
    let imeFajla = req.body.imeFajla;
    zaposleni_1.default.collection.updateOne({ "korime": korime }, { $set: { "slika": imeFajla } });
    res.json({ poruka: 1 });
});
// SPISKOVI ----------------------------------------------------------------------------------------------------------------
router.route('/otvoriSpisak').post((req, res) => {
    let otvorio = req.body.otvorio;
    let naziv = req.body.naziv;
    let termin = req.body.termin;
    let mesto = req.body.mesto;
    let limit = req.body.limit;
    let datum = req.body.datum;
    let obaveza = req.body.obaveza;
    let nazivObaveze = req.body.nazivObaveze;
    let sifra = req.body.sifra;
    let studenti = req.body.studenti;
    spisak_1.default.collection.insertOne({ 'otvorio': otvorio, 'naziv': naziv, 'termin': termin, 'mesto': mesto, 'limit': limit, 'datum': datum, 'obaveza': obaveza, 'nazivObaveze': nazivObaveze, 'sifra': sifra, 'studenti': studenti });
    res.json({ poruka: 1 });
});
router.route('/dohvatiSpiskove').post((req, res) => {
    let korime = req.body.korime;
    let sifra = req.body.sifra;
    let obaveza = req.body.obaveza;
    spisak_1.default.find({ "otvorio": korime, "sifra": sifra, "obaveza": obaveza }, (err, spiskovi) => {
        if (err)
            console.log(err);
        else
            res.json(spiskovi);
    });
});
router.route('/dohvatiSpiskoveStudent').post((req, res) => {
    let sifra = req.body.sifra;
    let obaveza = req.body.obaveza;
    spisak_1.default.find({ "sifra": sifra, "obaveza": obaveza }, (err, spiskovi) => {
        if (err)
            console.log(err);
        else
            res.json(spiskovi);
    });
});
router.route('/zatvoriSpisak').post((req, res) => {
    let spisakObjekat = req.body.spisakObjekat;
    let noviDatum = req.body.noviDatum;
    spisak_1.default.collection.updateOne({ 'otvorio': spisakObjekat.otvorio, 'naziv': spisakObjekat.naziv, 'termin': spisakObjekat.termin, 'mesto': spisakObjekat.mesto, 'limit': spisakObjekat.limit, 'datum': spisakObjekat.datum, 'obaveza': spisakObjekat.obaveza, 'nazivObaveze': spisakObjekat.nazivObaveze, 'sifra': spisakObjekat.sifra }, { $set: { "datum": noviDatum } });
    res.json({ poruka: 1 });
});
router.route('/obrisiSpisak').post((req, res) => {
    let spisakObjekat = req.body.spisakObjekat;
    spisak_1.default.collection.deleteOne({ 'otvorio': spisakObjekat.otvorio, 'naziv': spisakObjekat.naziv, 'termin': spisakObjekat.termin, 'mesto': spisakObjekat.mesto, 'limit': spisakObjekat.limit, 'datum': spisakObjekat.datum, 'obaveza': spisakObjekat.obaveza, 'nazivObaveze': spisakObjekat.nazivObaveze, 'sifra': spisakObjekat.sifra });
    res.json({ poruka: 1 });
});
router.route('/azurirajPrijavu').post((req, res) => {
    let spisakObjekat = req.body.spisak;
    let korime = req.body.korime;
    let noviFajl = req.body.noviFajl;
    spisak_1.default.collection.updateOne({ 'otvorio': spisakObjekat.otvorio, 'naziv': spisakObjekat.naziv, 'termin': spisakObjekat.termin, 'mesto': spisakObjekat.mesto, 'limit': spisakObjekat.limit, 'datum': spisakObjekat.datum, 'obaveza': spisakObjekat.obaveza, 'nazivObaveze': spisakObjekat.nazivObaveze, 'sifra': spisakObjekat.sifra }, { $set: { "studenti.$[indeks].rad": noviFajl } }, { arrayFilters: [{ "indeks.korime": korime }] });
    res.json({ poruka: 1 });
});
router.route('/dodajPrijavu').post((req, res) => {
    let spisakObjekat = req.body.spisak;
    let korime = req.body.korime;
    let noviFajl = req.body.noviFajl;
    let noviStudent = {
        korime: korime,
        rad: noviFajl
    };
    spisak_1.default.collection.updateOne({ 'otvorio': spisakObjekat.otvorio, 'naziv': spisakObjekat.naziv, 'termin': spisakObjekat.termin, 'mesto': spisakObjekat.mesto, 'limit': spisakObjekat.limit, 'datum': spisakObjekat.datum, 'obaveza': spisakObjekat.obaveza, 'nazivObaveze': spisakObjekat.nazivObaveze, 'sifra': spisakObjekat.sifra }, { $push: { 'studenti': noviStudent } });
    res.json({ poruka: 1 });
});
// PRACENJE PREDMETA ------------------------------------------------------------------------------------------------------------
router.route('/dohvatiStudente').get((req, res) => {
    student_1.default.find({}, (err, student) => {
        if (err)
            console.log(err);
        else
            res.json(student);
    });
});
router.route('/dohvatiPrate').get((req, res) => {
    prati_1.default.find({}, (err, prati) => {
        if (err)
            console.log(err);
        else
            res.json(prati);
    });
});
router.route('/dodajPrati').post((req, res) => {
    let korime = req.body.korime;
    let sifra = req.body.sifra;
    prati_1.default.collection.insertOne({ 'korime': korime, 'sifra': sifra });
    res.json({ poruka: 1 });
});
router.route('/obrisiPrati').post((req, res) => {
    let korime = req.body.korime;
    let sifra = req.body.sifra;
    prati_1.default.collection.deleteOne({ "korime": korime, "sifra": sifra });
    res.json({ poruka: 1 });
});
// OBAVESTENJA ADMIN -----------------------------------------------------------------------------------------------------------------------------------------
router.route('/dohvatiKategorije').get((req, res) => {
    kategorija_1.default.find({}, (err, kategorija) => {
        if (err)
            console.log(err);
        else
            res.json(kategorija);
    });
});
router.route('/dodajKategoriju').post((req, res) => {
    let ime = req.body.ime;
    let obavestenja = new Array();
    kategorija_1.default.collection.insertOne({ 'ime': ime, 'obavestenja': obavestenja });
    res.json({ poruka: 1 });
});
router.route('/dodajObavestenje').post((req, res) => {
    let novoObavestenje = req.body.novoObavestenje;
    let ime = req.body.ime;
    kategorija_1.default.collection.updateOne({ 'ime': ime }, { $push: { 'obavestenja': novoObavestenje } });
    res.json({ poruka: 1 });
});
router.route('/obrisiKategoriju').post((req, res) => {
    let kategorijaObjekat = req.body.kategorija;
    kategorija_1.default.collection.deleteOne({ "ime": kategorijaObjekat.ime });
    res.json({ poruka: 1 });
});
router.route('/obrisiObavestenjeGlobal').post((req, res) => {
    let obavestenje = req.body.obavestenje;
    let ime = req.body.ime;
    kategorija_1.default.collection.updateOne({ "ime": ime }, { $pull: { "obavestenja": { "datum": obavestenje.datum, "naslov": obavestenje.naslov, "sadrzaj": obavestenje.sadrzaj } } });
    res.json({ poruka: 1 });
});
// OBAVESTENJA ADMIN -----------------------------------------------------------------------------------------------------------------------------------------
router.route('/dohvatiMapiranja').get((req, res) => {
    mapiranje_1.default.find({}, (err, mapiranje) => {
        if (err)
            console.log(err);
        else
            res.json(mapiranje);
    });
});
router.route('/dodajMapiranje').post((req, res) => {
    let mapiranjeObjekat = req.body.mapiranje;
    mapiranje_1.default.collection.insertOne({ 'sifraPrikaz': mapiranjeObjekat.sifraPrikaz, 'sifraMapiran': mapiranjeObjekat.sifraMapiran });
    res.json({ poruka: 1 });
});
app.use('/', router);
app.use('/files', express_1.default.static(fajloviKorisnika));
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map