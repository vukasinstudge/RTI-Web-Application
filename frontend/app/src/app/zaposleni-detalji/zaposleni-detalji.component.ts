import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Angazovan } from '../model/angazovan.model';
import { Korisnik } from '../model/korisnik.model';
import { Predmet } from '../model/predmet.model';
import { Zaposleni } from '../model/zaposleni.model';
import { PredmetService } from '../predmet.service';
import { ZaposleniService } from '../zaposleni.service';

@Component({
  selector: 'app-zaposleni-detalji',
  templateUrl: './zaposleni-detalji.component.html',
  styleUrls: ['./zaposleni-detalji.component.css']
})
export class ZaposleniDetaljiComponent implements OnInit {

  constructor(private service: KorisnikService, private predmetService: PredmetService, private zaposleniService: ZaposleniService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    this.trenutni = JSON.parse(localStorage.getItem('zaposleniDetalji'));
    this.dohvatiPredmeteZaposlenog();
  }

  trenutni: Zaposleni;  
  drzePredmet: string[];
  predmeti: Predmet[];

  korisnik: Korisnik;

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

  odjava() {
    localStorage.setItem('korisnik', null);
    localStorage.setItem('admin', null);
    localStorage.setItem('student', null);
    localStorage.setItem('zaposleni', null);
    this.ruter.navigate(['/home']);
  }

}
