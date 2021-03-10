import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerstudent',
  templateUrl: './registerstudent.component.html',
  styleUrls: ['./registerstudent.component.css']
})
export class RegisterstudentComponent implements OnInit {

  constructor(private service: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.korime = "";
    this.lozinka = "";
    this.indeks = "";
    this.ime = "";
    this.prezime = "";
    this.tipStudija = "d";
    this.status = "aktivan";
  }

  korime: string;
  lozinka: string;
  indeks: string;
  tipStudija: string;
  ime: string;
  prezime: string;
  status: string;
  greska: string[];

  registracija() {
    this.greska = [""];
    if (this.korime == "" || this.lozinka == "" || this.indeks == "" || this.ime == "" || this.prezime == "") {
      this.greska.push("Unesi sve podatke");
      return;
    }

    let regexKorime = new RegExp('[a-z][a-z][0-9][0-9][0-9][0-9][0-9][0-9][dmp]@student.etf.rs');
    if (!regexKorime.test(this.korime)) {
      this.greska.push("Korisnicko ime nije odgovarajuce");
      return;
    }

    let regexIndeks = new RegExp('[0-9][0-9][0-9][0-9]/[0-9][0-9][0-9][0-9]');
    if (!regexIndeks.test(this.indeks)) {
      this.greska.push("Indeks nije odgovarajuci");
      return;
    }

    this.service.dodajStudenta(this.korime, this.lozinka, this.indeks, this.tipStudija, this.ime, this.prezime, this.status).subscribe(res => {
      if (res['poruka'] == 1) {
        this.service.dodajKorisnika(this.korime, this.lozinka, "student", 0).subscribe(res => {
          if (res['poruka'] == 1) {
            this.ruter.navigate(['home']);
          } else {
            alert('Greska');
          }
        });
      } else {
        alert('Greska');
      }
    });
    
  }

}
