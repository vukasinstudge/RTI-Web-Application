import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Predmet } from '../model/predmet.model';
import { PredmetService } from '../predmet.service';

@Component({
  selector: 'app-predmet-obavestenja',
  templateUrl: './predmet-obavestenja.component.html',
  styleUrls: ['./predmet-obavestenja.component.css']
})
export class PredmetObavestenjaComponent implements OnInit {

  constructor(private service: PredmetService, private ruter: Router) { }

  ngOnInit(): void {
    this.service.dohvatiPredmet(localStorage.getItem('predmetDetaljiSifra')).subscribe((predmet: Predmet) => {
      this.predmetDetalji = predmet;
      for (let i = 0; i < predmet.obavestenja.length; i++) {
        for (let j = i + 1; j < predmet.obavestenja.length; j++) {
          if (this.convert((predmet.obavestenja[i] as any).datum) < this.convert((predmet.obavestenja[j] as any).datum)) {
            let temp = predmet.obavestenja[i];
            predmet.obavestenja[i] = predmet.obavestenja[j];
            predmet.obavestenja[j] = temp;
          }
        }
      }
      this.vidljivoIspitna = this.predmetDetalji.ispitnaPitanja.otkljucano;
      this.vidljivoLaboratorija = this.predmetDetalji.labovi.otkljucano;
      this.vidljivoDomaci = this.predmetDetalji.domaci.otkljucano;
      this.now = Date.now();
      this.sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    });
  }

  predmetDetalji: Predmet;
  now: number;
  sevenDaysAgo: number;

  vidljivoIspitna: boolean;
  vidljivoLaboratorija: boolean;
  vidljivoDomaci: boolean;

  convert(datumString) {
    return Date.parse(datumString);
  }

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
