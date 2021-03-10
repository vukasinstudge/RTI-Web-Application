import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Spisak } from '../model/spisak.model';
import { PredmetService } from '../predmet.service';

@Component({
  selector: 'app-spisak-detalji',
  templateUrl: './spisak-detalji.component.html',
  styleUrls: ['./spisak-detalji.component.css']
})
export class SpisakDetaljiComponent implements OnInit {

  constructor(private predmetService: PredmetService, private ruter: Router) { }

  ngOnInit(): void {
    this.spisak = JSON.parse(localStorage.getItem('spisak'));
  }

  spisak: Spisak;

  preuzmi(fajl) {
    this.predmetService.preuzmi(fajl.ime);
  }

  nazad() {
    if (localStorage.getItem('dosaoSa') == 'dosaoSaLaba') this.ruter.navigate(['/zaposleniMeniPredmetLaboratorija']);
    else this.ruter.navigate(['/zaposleniMeniPredmetDomaci']);
  }

  odjava() {
    localStorage.setItem('korisnik', null);
    localStorage.setItem('admin', null);
    localStorage.setItem('student', null);
    localStorage.setItem('zaposleni', null);
    this.ruter.navigate(['/home']);
  }

}
