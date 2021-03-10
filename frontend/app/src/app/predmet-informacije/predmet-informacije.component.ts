import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Angazovan } from '../model/angazovan.model';
import { Predmet } from '../model/predmet.model';
import { Zaposleni } from '../model/zaposleni.model';
import { PredmetService } from '../predmet.service';
import { ZaposleniService } from '../zaposleni.service';

@Component({
  selector: 'app-predmet-informacije',
  templateUrl: './predmet-informacije.component.html',
  styleUrls: ['./predmet-informacije.component.css']
})
export class PredmetInformacijeComponent implements OnInit {

  constructor(private service: PredmetService, private zaposleniService: ZaposleniService, private korisnikService: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.service.dohvatiPredmet(localStorage.getItem('predmetDetaljiSifra')).subscribe((predmet: Predmet) => {
      this.predmetDetalji = predmet;
      this.vidljivoIspitna = this.predmetDetalji.ispitnaPitanja.otkljucano;
      this.vidljivoLaboratorija = this.predmetDetalji.labovi.otkljucano;
      this.vidljivoDomaci = this.predmetDetalji.domaci.otkljucano;
      this.dohvatiNastavnike();
      
      this.pravaSifra = localStorage.getItem('pravaSifra');
      this.praviOdsek = localStorage.getItem('praviOdsek');
    });
  }

  predmetDetalji: Predmet;
  drzePredmet: string[];
  drzePredmetZaposleni: Zaposleni[];

  vidljivoIspitna: boolean;
  vidljivoLaboratorija: boolean;
  vidljivoDomaci: boolean;

  pravaSifra: string;
  praviOdsek: string;

  dohvatiNastavnike() {
    this.zaposleniService.dohvatiNastavnike(this.predmetDetalji.sifra).subscribe((angazovani: Angazovan[]) => {
      if (angazovani) {
        this.drzePredmet = new Array();
        this.drzePredmetZaposleni = new Array();
        angazovani.forEach(a => {
          if (this.drzePredmet.indexOf(a.korime) <= -1) {
            this.drzePredmet.push(a.korime);
            this.korisnikService.dohvatiZaposlenog(a.korime).subscribe((zaposleni: Zaposleni) => {
              if (zaposleni) {
                this.drzePredmetZaposleni.push(zaposleni);
              }
            });
          }
        });
      }
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
