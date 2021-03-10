import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik.model';
import { Predmet } from '../model/predmet.model';
import { Zaposleni } from '../model/zaposleni.model';
import { ZaposleniService } from '../zaposleni.service';

@Component({
  selector: 'app-zaposleni',
  templateUrl: './zaposleni.component.html',
  styleUrls: ['./zaposleni.component.css']
})
export class ZaposleniComponent implements OnInit {

  constructor(private service: ZaposleniService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    this.dohvatiZaposlene();
  }

  zaposleni: Zaposleni[];

  korisnik: Korisnik;
  
  dohvatiZaposlene() {
    this.service.dohvatiZaposlene().subscribe((zaposleni: Zaposleni[]) => {
      this.zaposleni = zaposleni;
    });
  }

  zaposleniDetalji(zaposleni) {
    localStorage.setItem('zaposleniDetalji', JSON.stringify(zaposleni));
    this.ruter.navigate(['/zaposleniDetalji']);
  }

  odjava() {
    localStorage.setItem('korisnik', null);
    localStorage.setItem('admin', null);
    localStorage.setItem('student', null);
    localStorage.setItem('zaposleni', null);
    this.ruter.navigate(['/home']);
  }

}
