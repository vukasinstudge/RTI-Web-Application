import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PredmetService } from '../predmet.service';

@Component({
  selector: 'app-otvori-spisak',
  templateUrl: './otvori-spisak.component.html',
  styleUrls: ['./otvori-spisak.component.css']
})
export class OtvoriSpisakComponent implements OnInit {

  constructor(private predmetService: PredmetService, private ruter: Router) { }

  ngOnInit(): void {
    this.otvorio = localStorage.getItem("otvorio");
    this.naziv = "";
    this.termin = "";
    this.mesto = "";
    this.limit = null;
    this.datum = null;
    this.obaveza = localStorage.getItem("obaveza");
    this.nazivObaveze = localStorage.getItem("nazivObaveze");
    this.sifra = localStorage.getItem("sifra");
    this.studenti = new Array();
  }

  otvorio: string;
  naziv: string;
  termin: string;
  mesto: string;
  limit: number;
  datum: Date;
  obaveza: string;
  nazivObaveze: string;
  sifra: string;
  studenti: Array<Object>;

  otvoriSpisak() {
    if (this.limit == null) this.limit = 1000;
    this.predmetService.otvoriSpisak(this.otvorio, this.naziv, this.termin, this.mesto, this.limit, this.datum.toString(), this.obaveza, this.nazivObaveze, this.sifra, this.studenti).subscribe(res => {
      if (res['poruka'] == 1) {
        if (this.obaveza == "lab") this.ruter.navigate(['/zaposleniMeniPredmetLaboratorija']);
        else this.ruter.navigate(['/zaposleniMeniPredmetDomaci']);
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
