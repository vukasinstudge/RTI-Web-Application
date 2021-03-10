import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../model/korisnik.model';
import { Mapiranje } from '../model/mapiranje.model';
import { Prati } from '../model/prati.model';
import { Predmet } from '../model/predmet.model';
import { PredmetService } from '../predmet.service';

@Component({
  selector: 'app-osnovne-studije',
  templateUrl: './osnovne-studije.component.html',
  styleUrls: ['./osnovne-studije.component.css']
})
export class OsnovneStudijeComponent implements OnInit {

  constructor(private service: PredmetService, private korisnikService: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.dohvatiSI();
    this.dohvatiRTI();
    this.dohvatiOstalo();
    this.dohvatiPrate();

    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
  }

  korisnik: Korisnik;

  prate: Prati[];

  mapiranja: Mapiranje[];

  si1: Predmet[]; si2: Predmet[]; si3: Predmet[]; si4: Predmet[]; si5: Predmet[]; si6: Predmet[]; si7: Predmet[]; si8: Predmet[];
  rti1: Predmet[]; rti2: Predmet[]; rti3: Predmet[]; rti4: Predmet[]; rti5: Predmet[]; rti6: Predmet[]; rti7: Predmet[]; rti8: Predmet[];
  ostalo1: Predmet[]; ostalo2: Predmet[]; ostalo3: Predmet[]; ostalo4: Predmet[]; ostalo5: Predmet[]; ostalo6: Predmet[]; ostalo7: Predmet[]; ostalo8: Predmet[];

  dohvatiSI() {
    this.service.dohvatiPredmete(1, "si").subscribe((predmeti: Predmet[]) => {
      this.si1 = predmeti;
    });
    this.service.dohvatiPredmete(2, "si").subscribe((predmeti: Predmet[]) => {
      this.si2 = predmeti;
    });
    this.service.dohvatiPredmete(3, "si").subscribe((predmeti: Predmet[]) => {
      this.si3 = predmeti;
    });
    this.service.dohvatiPredmete(4, "si").subscribe((predmeti: Predmet[]) => {
      this.si4 = predmeti;
    });
    this.service.dohvatiPredmete(5, "si").subscribe((predmeti: Predmet[]) => {
      this.si5 = predmeti;
    });
    this.service.dohvatiPredmete(6, "si").subscribe((predmeti: Predmet[]) => {
      this.si6 = predmeti;
    });
    this.service.dohvatiPredmete(7, "si").subscribe((predmeti: Predmet[]) => {
      this.si7 = predmeti;
    });
    this.service.dohvatiPredmete(8, "si").subscribe((predmeti: Predmet[]) => {
      this.si8 = predmeti;
    });
  }

  dohvatiRTI() {
    this.service.dohvatiPredmete(1, "rti").subscribe((predmeti: Predmet[]) => {
      this.rti1 = predmeti;
    });
    this.service.dohvatiPredmete(2, "rti").subscribe((predmeti: Predmet[]) => {
      this.rti2 = predmeti;
    });
    this.service.dohvatiPredmete(3, "rti").subscribe((predmeti: Predmet[]) => {
      this.rti3 = predmeti;
    });
    this.service.dohvatiPredmete(4, "rti").subscribe((predmeti: Predmet[]) => {
      this.rti4 = predmeti;
    });
    this.service.dohvatiPredmete(5, "rti").subscribe((predmeti: Predmet[]) => {
      this.rti5 = predmeti;
    });
    this.service.dohvatiPredmete(6, "rti").subscribe((predmeti: Predmet[]) => {
      this.rti6 = predmeti;
    });
    this.service.dohvatiPredmete(7, "rti").subscribe((predmeti: Predmet[]) => {
      this.rti7 = predmeti;
    });
    this.service.dohvatiPredmete(8, "rti").subscribe((predmeti: Predmet[]) => {
      this.rti8 = predmeti;
    });
  }

  dohvatiOstalo() {
    this.service.dohvatiPredmete(1, "ostalo").subscribe((predmeti: Predmet[]) => {
      this.ostalo1 = predmeti;
    });
    this.service.dohvatiPredmete(2, "ostalo").subscribe((predmeti: Predmet[]) => {
      this.ostalo2 = predmeti;
    });
    this.service.dohvatiPredmete(3, "ostalo").subscribe((predmeti: Predmet[]) => {
      this.ostalo3 = predmeti;
    });
    this.service.dohvatiPredmete(4, "ostalo").subscribe((predmeti: Predmet[]) => {
      this.ostalo4 = predmeti;
    });
    this.service.dohvatiPredmete(5, "ostalo").subscribe((predmeti: Predmet[]) => {
      this.ostalo5 = predmeti;
    });
    this.service.dohvatiPredmete(6, "ostalo").subscribe((predmeti: Predmet[]) => {
      this.ostalo6 = predmeti;
    });
    this.service.dohvatiPredmete(7, "ostalo").subscribe((predmeti: Predmet[]) => {
      this.ostalo7 = predmeti;
    });
    this.service.dohvatiPredmete(8, "ostalo").subscribe((predmeti: Predmet[]) => {
      this.ostalo8 = predmeti;
    });
  }

  predmetDetalji(predmet) {
    this.service.dohvatiMapiranja().subscribe((mapiranja: Mapiranje[]) => {
      localStorage.setItem('pravaSifra', predmet.sifra);
      localStorage.setItem('praviOdsek', predmet.odsek);
      this.mapiranja = mapiranja;
      let predmetDetaljiSifra = predmet.sifra;
      mapiranja.forEach(mapiranje => {
        if (mapiranje.sifraMapiran == predmetDetaljiSifra) {
          predmetDetaljiSifra = mapiranje.sifraPrikaz;
        }
      });
      localStorage.setItem('predmetDetaljiSifra', predmetDetaljiSifra);
      this.ruter.navigate(['/predmetObavestenja']);
    });
  }

  dohvatiPrate() {
    this.korisnikService.dohvatiPrate().subscribe((prate: Prati[]) => {
      this.prate = prate;
    });
  }

  dozvoljeno(predmet) {
    if (this.prate == null) return;
    if (this.korisnik == null) return false;
    if (this.korisnik.tip == "admin") return true;
    if (this.korisnik.tip == "zaposleni") return true;
    if (this.korisnik.tip == "student") {
      for (let i = 0; i < this.prate.length; i++) {
        if (this.prate[i].korime == this.korisnik.korime && this.prate[i].sifra == predmet.sifra) return true;
      }
    }
    return false;
  }

  odjava() {
    localStorage.setItem('korisnik', null);
    localStorage.setItem('admin', null);
    localStorage.setItem('student', null);
    localStorage.setItem('zaposleni', null);
    this.ruter.navigate(['/home']);
  }

}
