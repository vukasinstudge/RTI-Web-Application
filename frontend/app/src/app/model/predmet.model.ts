import { MojFajl } from "./fajl.model";

export class Predmet {
    ime: string;
    tip: string;
    semestar: number;
    odsek: string;
    sifra: string;
    fondPredavanja: number;
    fondVezbe: number;
    espb: number;
    cilj: string;
    terminPredavanja: string;
    terminVezbe: string;
    polaganje: string;
    komentar: string;
    predavanja: Array<MojFajl>;
    vezbe: Array<MojFajl>;
    obavestenja: Array<[
        datum: string,
        naslov: string,
        sadrzaj: string,
        dodaci: Array<MojFajl>,
        napisao: string
    ]>;
    ispitnaPitanja: {
        rokovi: Array<MojFajl>,
        resenja: Array<MojFajl>,
        otkljucano: boolean
    };
    labovi: {
        brojLabova: number,
        osnovneInformacije: string,
        otkljucano: boolean,
        labovi: Array<[
            labNaziv: string,
            labMaterijal: Array<MojFajl>
        ]>
    };
    domaci: {
        otkljucano: boolean,
        domaciZadaci: Array<[
            informacije: string,
            domaciMaterijal: Array<MojFajl>
        ]>
    };
    brojGrupa: number;
}