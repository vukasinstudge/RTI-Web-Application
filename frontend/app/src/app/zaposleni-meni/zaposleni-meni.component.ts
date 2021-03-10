import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Zaposleni } from '../model/zaposleni.model';

@Component({
  selector: 'app-zaposleni-meni',
  templateUrl: './zaposleni-meni.component.html',
  styleUrls: ['./zaposleni-meni.component.css']
})
export class ZaposleniMeniComponent implements OnInit {

  constructor(private service: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.zaposleni = JSON.parse(localStorage.getItem('zaposleni'));
    this.staroKorime = this.zaposleni.korime;

    this.korime = this.zaposleni.korime;
    this.lozinka = this.zaposleni.lozinka;
    this.ime = this.zaposleni.ime;
    this.prezime = this.zaposleni.prezime;
    this.adresa = this.zaposleni.adresa;
    this.telefon = this.zaposleni.telefon;
    this.sajt = this.zaposleni.sajt;
    this.biografija = this.zaposleni.biografija;
    this.zvanje = this.zaposleni.zvanje;
    this.brojKabineta = this.zaposleni.brojKabineta;
    this.status = this.zaposleni.status;
  
  }

  zaposleni: Zaposleni;
  staroKorime: string;

  korime: string;
  lozinka: string;
  ime: string;
  prezime: string;
  adresa: string;
  telefon: string;
  sajt: string;
  biografija: string;
  zvanje: string;
  brojKabineta: number;
  status: string;

  azuriraj() {
    this.service.azurirajZaposlenog(this.staroKorime, this.korime, this.lozinka, this.ime, this.prezime, this.adresa, this.telefon, this.sajt, this.biografija, this.zvanje, this.brojKabineta, this.status).subscribe(res => {
      if (res['poruka'] == 1) {
        this.ruter.navigate(['/zaposleniMeni']);
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
