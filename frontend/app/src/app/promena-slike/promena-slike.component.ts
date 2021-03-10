import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../model/korisnik.model';
import { Zaposleni } from '../model/zaposleni.model';
import { ZaposleniService } from '../zaposleni.service';

@Component({
  selector: 'app-promena-slike',
  templateUrl: './promena-slike.component.html',
  styleUrls: ['./promena-slike.component.css']
})
export class PromenaSlikeComponent implements OnInit {

  public formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  constructor(private korisnikService: KorisnikService, private zaposleniService: ZaposleniService, private ruter: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.trenutniKorisnik = JSON.parse(localStorage.getItem('korisnikZaPromenuSlike'));
    this.korisnikService.dohvatiZaposlenog(this.trenutniKorisnik.korime).subscribe((zaposleni: Zaposleni) => {
      this.trenutniZaposleni = zaposleni;
    });
  }

  trenutniKorisnik: Korisnik;
  trenutniZaposleni: Zaposleni;
  imeFajla: string;
  fajlZaUpload: File;

  public promenaFajla(event) {
    const reader = new FileReader();
  
    if (event.target.files && event.target.files.length) {
      this.imeFajla = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });
      };
    }
  }

  promeniSliku() {
    this.zaposleniService.promeniSliku(this.trenutniZaposleni.korime, this.imeFajla).subscribe((res) => {
      if(res['poruka'] == 1){
        this.ruter.navigate(['/admin']);
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
