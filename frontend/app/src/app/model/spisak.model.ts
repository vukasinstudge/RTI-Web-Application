import { MojFajl } from "./fajl.model";

export class Spisak {
    otvorio: string;
    naziv: string;
    termin: string;
    mesto: string;
    limit: number;
    datum: string;
    obaveza: string;
    nazivObaveze: string;
    sifra: string;
    studenti: Array<[
        korime: string,
        rad: MojFajl
    ]>
}