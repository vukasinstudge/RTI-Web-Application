import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Zaposleni } from '../model/zaposleni.model';

@Component({
  selector: 'app-zaposleni-azuriraj',
  templateUrl: './zaposleni-azuriraj.component.html',
  styleUrls: ['./zaposleni-azuriraj.component.css']
})
export class ZaposleniAzurirajComponent implements OnInit {

  constructor(private service: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.zaposleniAzuriraj = JSON.parse(localStorage.getItem('zaposleniAzuriraj'));
    this.staroKorime = this.zaposleniAzuriraj.korime;

    this.korime = this.zaposleniAzuriraj.korime;
    this.lozinka = this.zaposleniAzuriraj.lozinka;
    this.ime = this.zaposleniAzuriraj.ime;
    this.prezime = this.zaposleniAzuriraj.prezime;
    this.adresa = this.zaposleniAzuriraj.adresa;
    this.telefon = this.zaposleniAzuriraj.telefon;
    this.sajt = this.zaposleniAzuriraj.sajt;
    this.biografija = this.zaposleniAzuriraj.biografija;
    this.zvanje = this.zaposleniAzuriraj.zvanje;
    this.brojKabineta = this.zaposleniAzuriraj.brojKabineta;
    this.status = this.zaposleniAzuriraj.status;
  
  }

  zaposleniAzuriraj: Zaposleni;
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
        this.service.azurirajKorisnika(this.staroKorime, this.korime, this.lozinka).subscribe(res => {
          if (res['poruka'] == 1) {
            this.ruter.navigate(['/admin']);
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
