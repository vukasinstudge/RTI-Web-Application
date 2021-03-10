import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Angazovan } from '../model/angazovan.model';
import { Predmet } from '../model/predmet.model';
import { Zaposleni } from '../model/zaposleni.model';
import { PredmetService } from '../predmet.service';
import { ZaposleniService } from '../zaposleni.service';

@Component({
  selector: 'app-zaposleni-meni-predmeti',
  templateUrl: './zaposleni-meni-predmeti.component.html',
  styleUrls: ['./zaposleni-meni-predmeti.component.css']
})
export class ZaposleniMeniPredmetiComponent implements OnInit {

  constructor(private korisnikService: KorisnikService, private predmetService: PredmetService, private zaposleniService: ZaposleniService, private ruter: Router) { }

  ngOnInit(): void {
    this.trenutni = JSON.parse(localStorage.getItem('zaposleni'));
    this.predmetIzabran = JSON.parse(localStorage.getItem('predmetIzabran'));
    if (this.predmetIzabran != null) {
      this.predmetIzabranSifra = this.predmetIzabran.sifra;
      this.staraSifra = this.predmetIzabran.sifra;
      this.ime = this.predmetIzabran.ime;
      this.tip = this.predmetIzabran.tip;
      this.semestar = this.predmetIzabran.semestar;
      this.odsek = this.predmetIzabran.odsek;
      this.sifra = this.predmetIzabran.sifra;
      this.fondPredavanja = this.predmetIzabran.fondPredavanja;
      this.fondVezbe = this.predmetIzabran.fondVezbe;
      this.espb = this.predmetIzabran.espb;
      this.cilj = this.predmetIzabran.cilj;
      this.terminPredavanja = this.predmetIzabran.terminPredavanja;
      this.terminVezbe = this.predmetIzabran.terminVezbe;
      this.polaganje = this.predmetIzabran.polaganje;
      this.komentar = this.predmetIzabran.komentar;
      this.brojGrupa = this.predmetIzabran.brojGrupa;
    }
    this.dohvatiPredmeteZaposlenog();
  }

  predmetIzabranSifra: string;
  predmetIzabran: Predmet;
  trenutni: Zaposleni;  
  drzePredmet: string[];
  predmeti: Predmet[];

  staraSifra: string;
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
  brojGrupa: number;

  dohvatiPredmeteZaposlenog() {
    this.zaposleniService.dohvatiNastavnikPredmete(this.trenutni.korime).subscribe((angazovani: Angazovan[]) => {
      if (angazovani) {
        this.drzePredmet = new Array();
        this.predmeti = new Array();
        angazovani.forEach(a => {
          if (this.drzePredmet.indexOf(a.sifra) <= -1) {
            this.drzePredmet.push(a.sifra);
            this.predmetService.dohvatiPredmet(a.sifra).subscribe((predmet: Predmet) => {
              if (predmet) {
                this.predmeti.push(predmet);
              }
            });
          }
        });
      }
    });
  }

  postaviPredmet() {
    this.predmetService.dohvatiPredmet(this.predmetIzabranSifra).subscribe((predmet: Predmet) => {
      if (predmet) {
        this.predmetIzabran = predmet;
        localStorage.setItem('predmetIzabran', JSON.stringify(this.predmetIzabran));
        this.staraSifra = this.predmetIzabran.sifra;
        this.ime = this.predmetIzabran.ime;
        this.tip = this.predmetIzabran.tip;
        this.semestar = this.predmetIzabran.semestar;
        this.odsek = this.predmetIzabran.odsek;
        this.sifra = this.predmetIzabran.sifra;
        this.fondPredavanja = this.predmetIzabran.fondPredavanja;
        this.fondVezbe = this.predmetIzabran.fondVezbe;
        this.espb = this.predmetIzabran.espb;
        this.cilj = this.predmetIzabran.cilj;
        this.terminPredavanja = this.predmetIzabran.terminPredavanja;
        this.terminVezbe = this.predmetIzabran.terminVezbe;
        this.polaganje = this.predmetIzabran.polaganje;
        this.komentar = this.predmetIzabran.komentar;
        this.brojGrupa = this.predmetIzabran.brojGrupa;
      }
    });
  }

  azurirajPredmet() {
    this.predmetService.azurirajPredmet(this.staraSifra, this.ime, this.tip, this.semestar, this.odsek, this.sifra, this.fondPredavanja, this.fondVezbe, this.espb, this.cilj, this.terminPredavanja, this.terminVezbe, this.polaganje, this.komentar, this.brojGrupa).subscribe(res => {
      if (res['poruka'] == 1) {
        this.ruter.navigate(['/zaposleniMeniPredmeti']);
      }
    });
    alert("Izmene izvrsene");
  }

  odjava() {
    localStorage.setItem('korisnik', null);
    localStorage.setItem('admin', null);
    localStorage.setItem('student', null);
    localStorage.setItem('zaposleni', null);
    this.ruter.navigate(['/home']);
  }

}
