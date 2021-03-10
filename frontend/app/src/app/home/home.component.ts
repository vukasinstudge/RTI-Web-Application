import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik.model';
import { KorisnikService } from '../korisnik.service';
import { Student } from '../model/student.model';
import { Admin } from '../model/admin.model';
import { Zaposleni } from '../model/zaposleni.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    this.student = JSON.parse(localStorage.getItem('student'));
    this.admin = JSON.parse(localStorage.getItem('admin'));
    this.zaposleni = JSON.parse(localStorage.getItem('zaposleni'));
  }

  korisnik: Korisnik;
  korime: string;
  lozinka: string;
  greska: string[];

  student: Student;
  admin: Admin;
  zaposleni: Zaposleni;

  prijava() {
    this.greska = [""];
    if (this.korime == "") this.greska.push("Unesite korisnicko ime");
    if (this.lozinka == "") this.greska.push("Unesite lozinku");
    if (this.korime == "" || this.lozinka == "") return;
    this.service.prijava(this.korime).subscribe((korisnik: Korisnik) => {
      if (korisnik) {
        if (korisnik.lozinka == this.lozinka) {
          localStorage.setItem('korisnik', JSON.stringify(korisnik));
          this.korisnik = korisnik;
          if (korisnik.promenioLozinku == 0) {
            this.ruter.navigate(['/promenaLozinke']);
          } else {
              if (korisnik.tip == "student") {
                this.service.dohvatiStudenta(korisnik.korime).subscribe((student: Student) => {
                if (student) {
                  localStorage.setItem('student', JSON.stringify(student));
                  this.student = student;
                  this.ruter.navigate(['/home']);
                }
              });
            }
            if (korisnik.tip == "admin") {
              this.service.dohvatiAdmina(korisnik.korime).subscribe((admin: Admin) => {
                if (admin) {
                  localStorage.setItem('admin', JSON.stringify(admin));
                  this.admin = admin;
                  this.ruter.navigate(['/admin']);
                }
              });
            }
            if (korisnik.tip == "zaposleni") {
              this.service.dohvatiZaposlenog(korisnik.korime).subscribe((zaposleni: Zaposleni) => {
                if (zaposleni) {
                  localStorage.setItem('zaposleni', JSON.stringify(zaposleni));
                  this.zaposleni = zaposleni;
                  this.ruter.navigate(['/zaposleniMeni']);
                }
              });
            }
          }
        } else {
          this.greska.push("Pogresna lozinka");
        }
      } else {
        this.greska.push("Korisnik ne postoji");
      }
    });
  }

  odjava() {
    this.korisnik = null;
    localStorage.setItem('korisnik', null);
    this.student = null;
    localStorage.setItem('student', null);
    this.admin = null;
    localStorage.setItem('admin', null);
    this.zaposleni = null;
    localStorage.setItem('zaposleni', null);
    this.ruter.navigate(['/home']);
  }

}
