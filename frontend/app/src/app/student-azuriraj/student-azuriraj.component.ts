import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Student } from '../model/student.model';

@Component({
  selector: 'app-student-azuriraj',
  templateUrl: './student-azuriraj.component.html',
  styleUrls: ['./student-azuriraj.component.css']
})
export class StudentAzurirajComponent implements OnInit {

  constructor(private service: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.studentAzuriraj = JSON.parse(localStorage.getItem('studentAzuriraj'));
    this.staroKorime = this.studentAzuriraj.korime;

    this.korime = this.studentAzuriraj.korime;
    this.lozinka = this.studentAzuriraj.lozinka;
    this.indeks = this.studentAzuriraj.indeks;
    this.ime = this.studentAzuriraj.ime;
    this.prezime = this.studentAzuriraj.prezime;
    this.tipStudija = this.studentAzuriraj.tipStudija;
    this.status = this.studentAzuriraj.status;
  
  }

  studentAzuriraj: Student;
  staroKorime: string;

  korime: string;
  lozinka: string;
  indeks: string;
  tipStudija: string;
  ime: string;
  prezime: string;
  status: string;

  azuriraj() {
    this.service.azurirajStudenta(this.staroKorime, this.korime, this.lozinka, this.indeks, this.ime, this.prezime, this.tipStudija, this.status).subscribe(res => {
      if (res['poruka'] == 1) {
        this.service.azurirajKorisnika(this.staroKorime, this.korime, this.lozinka).subscribe(res => {
          if (res['poruka'] == 1) {
            this.ruter.navigate(['/admin']);
          }
        });
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
