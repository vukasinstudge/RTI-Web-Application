import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik.model';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private service: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
  }

  korisnik: Korisnik;
  stara: string;
  nova: string;
  greska: string[];

  promeni() {
    this.greska = [""];
    if (this.stara != this.korisnik.lozinka) {
      this.greska.push("Stara lozinka nije tacna");
      return;
    }

    this.service.promeniLozinku(this.korisnik.korime, this.nova, this.korisnik.tip).subscribe((res) => {
      if(res['poruka'] == 1){
        this.korisnik = null;
        localStorage.setItem('korisnik', null);
        this.ruter.navigate(['/home']);
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
