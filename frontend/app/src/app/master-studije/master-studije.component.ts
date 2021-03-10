import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../model/korisnik.model';
import { Prati } from '../model/prati.model';
import { Predmet } from '../model/predmet.model';
import { PredmetService } from '../predmet.service';

@Component({
  selector: 'app-master-studije',
  templateUrl: './master-studije.component.html',
  styleUrls: ['./master-studije.component.css']
})
export class MasterStudijeComponent implements OnInit {

  constructor(private service: PredmetService, private korisnikService: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.dohvatiMaster();
    this.dohvatiPrate();

    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
  }

  korisnik: Korisnik;

  prate: Prati[];

  masterPredmeti: Predmet[];

  dohvatiMaster() {
    this.service.dohvatiPredmete(0, "master").subscribe((predmeti: Predmet[]) => {
      this.masterPredmeti = predmeti;
    });
  }

  predmetDetalji(predmet) {
    localStorage.setItem('predmetDetaljiSifra', predmet.sifra);
    localStorage.setItem('pravaSifra', predmet.sifra);
    localStorage.setItem('praviOdsek', predmet.odsek);
    this.ruter.navigate(['/predmetObavestenja']);
  }

  dohvatiPrate() {
    this.korisnikService.dohvatiPrate().subscribe((prate: Prati[]) => {
      this.prate = prate;
    });
  }

  dozvoljeno(predmet) {
    if (this.prate == null) return;
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
