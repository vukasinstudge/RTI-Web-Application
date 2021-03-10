import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Predmet } from '../model/predmet.model';
import { PredmetService } from '../predmet.service';

@Component({
  selector: 'app-predmet-azuriraj-admin',
  templateUrl: './predmet-azuriraj-admin.component.html',
  styleUrls: ['./predmet-azuriraj-admin.component.css']
})
export class PredmetAzurirajAdminComponent implements OnInit {

  constructor(private service: PredmetService, private ruter: Router) { }

  ngOnInit(): void {
    this.predmetAzurirajAdmin = JSON.parse(localStorage.getItem('predmetAzurirajAdmin'));
    this.staraSifra = this.predmetAzurirajAdmin.sifra;

    this.ime = this.predmetAzurirajAdmin.ime;
    this.tip = this.predmetAzurirajAdmin.tip;
    this.semestar = this.predmetAzurirajAdmin.semestar;
    this.odsek = this.predmetAzurirajAdmin.odsek;
    this.sifra = this.predmetAzurirajAdmin.sifra;
    this.fondPredavanja = this.predmetAzurirajAdmin.fondPredavanja;
    this.fondVezbe = this.predmetAzurirajAdmin.fondVezbe;
    this.espb = this.predmetAzurirajAdmin.espb;
    this.cilj = this.predmetAzurirajAdmin.cilj;
    this.terminPredavanja = this.predmetAzurirajAdmin.terminPredavanja;
    this.terminVezbe = this.predmetAzurirajAdmin.terminVezbe;
    this.polaganje = this.predmetAzurirajAdmin.polaganje;
    this.komentar = this.predmetAzurirajAdmin.komentar;
    this.brojGrupa = this.predmetAzurirajAdmin.brojGrupa;
  }

  predmetAzurirajAdmin: Predmet;
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

  azurirajPredmet() {
    this.service.azurirajPredmet(this.staraSifra, this.ime, this.tip, this.semestar, this.odsek, this.sifra, this.fondPredavanja, this.fondVezbe, this.espb, this.cilj, this.terminPredavanja, this.terminVezbe, this.polaganje, this.komentar, this.brojGrupa).subscribe(res => {
      if (res['poruka'] == 1) {
        this.ruter.navigate(['/admin']);
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
