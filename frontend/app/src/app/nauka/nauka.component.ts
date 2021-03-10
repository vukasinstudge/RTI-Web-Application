import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik.model';

@Component({
  selector: 'app-nauka',
  templateUrl: './nauka.component.html',
  styleUrls: ['./nauka.component.css']
})
export class NaukaComponent implements OnInit {

  constructor(private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
  }

  korisnik: Korisnik;

  odjava() {
    localStorage.setItem('korisnik', null);
    localStorage.setItem('admin', null);
    localStorage.setItem('student', null);
    localStorage.setItem('zaposleni', null);
    this.ruter.navigate(['/home']);
  }

}
