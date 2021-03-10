import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Predmet } from '../model/predmet.model';
import { PredmetService } from '../predmet.service';

@Component({
  selector: 'app-predmet-ispitna',
  templateUrl: './predmet-ispitna.component.html',
  styleUrls: ['./predmet-ispitna.component.css']
})
export class PredmetIspitnaComponent implements OnInit {

  constructor(private service: PredmetService, private ruter: Router) { }

  ngOnInit(): void {
    this.service.dohvatiPredmet(localStorage.getItem('predmetDetaljiSifra')).subscribe((predmet: Predmet) => {
      this.predmetDetalji = predmet;
      this.vidljivoLaboratorija = this.predmetDetalji.labovi.otkljucano;
      this.vidljivoDomaci = this.predmetDetalji.domaci.otkljucano;
    });
  }

  predmetDetalji: Predmet;
  vidljivoLaboratorija: boolean;
  vidljivoDomaci: boolean;

  preuzmi(fajl) {
    this.service.preuzmi(fajl.ime);
  }

  odjava() {
    localStorage.setItem('korisnik', null);
    localStorage.setItem('admin', null);
    localStorage.setItem('student', null);
    localStorage.setItem('zaposleni', null);
    this.ruter.navigate(['/home']);
  }

}
