import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Kategorija } from '../model/kategorija.model';
import { Korisnik } from '../model/korisnik.model';

@Component({
  selector: 'app-obavestenja',
  templateUrl: './obavestenja.component.html',
  styleUrls: ['./obavestenja.component.css']
})
export class ObavestenjaComponent implements OnInit {

  constructor(private korisnikService: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.dohvatiKategorije();
    this.pre3Meseca = Date.now() - 3 * 30 * 24 * 60 * 60 * 1000;
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
  }

  kategorije: Kategorija[];
  pre3Meseca: number;
  korisnik: Korisnik;

  dohvatiKategorije() {
    this.korisnikService.dohvatiKategorije().subscribe((kategorije: Kategorija[]) => {
      this.kategorije = kategorije;
      for (let i = 0; i < kategorije.length; i++) {
        let kat = kategorije[i];
        for (let j = 0; j < kat.obavestenja.length; j++) {
          for (let k = j + 1; k < kat.obavestenja.length; k++) {
            if (this.convert((kat.obavestenja[j] as any).datum) < this.convert((kat.obavestenja[k] as any).datum)) {
              let temp = kat.obavestenja[j];
              kat.obavestenja[j] = kat.obavestenja[k];
              kat.obavestenja[k] = temp;
            }
          }
        }
      }
    });
  }

  convert(datumString) {
    return Date.parse(datumString);
  }

  zaPrikaz(obavestenje) {
    if (this.convert(obavestenje.datum) >= this.pre3Meseca) return true;
    else return false;
  }

  odjava() {
    localStorage.setItem('korisnik', null);
    localStorage.setItem('admin', null);
    localStorage.setItem('student', null);
    localStorage.setItem('zaposleni', null);
    this.ruter.navigate(['/home']);
  }

}
