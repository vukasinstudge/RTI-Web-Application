import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Predmet } from '../model/predmet.model';
import { PredmetService } from '../predmet.service';

@Component({
  selector: 'app-predmet-vezbe',
  templateUrl: './predmet-vezbe.component.html',
  styleUrls: ['./predmet-vezbe.component.css']
})
export class PredmetVezbeComponent implements OnInit {

  constructor(private service: PredmetService, private ruter: Router) { }

  ngOnInit(): void {
    this.service.dohvatiPredmet(localStorage.getItem('predmetDetaljiSifra')).subscribe((predmet: Predmet) => {
      this.predmetDetalji = predmet;
      this.vidljivoIspitna = this.predmetDetalji.ispitnaPitanja.otkljucano;
      this.vidljivoLaboratorija = this.predmetDetalji.labovi.otkljucano;
      this.vidljivoDomaci = this.predmetDetalji.domaci.otkljucano;
    });
  }

  predmetDetalji: Predmet;

  vidljivoIspitna: boolean;
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
