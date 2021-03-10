import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Angazovan } from '../model/angazovan.model';
import { MojFajl } from '../model/fajl.model';
import { Predmet } from '../model/predmet.model';
import { Zaposleni } from '../model/zaposleni.model';
import { PredmetService } from '../predmet.service';
import { ZaposleniService } from '../zaposleni.service';

@Component({
  selector: 'app-zaposleni-meni-predmet-ispitna',
  templateUrl: './zaposleni-meni-predmet-ispitna.component.html',
  styleUrls: ['./zaposleni-meni-predmet-ispitna.component.css']
})
export class ZaposleniMeniPredmetIspitnaComponent implements OnInit {

  public formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  constructor(private korisnikService: KorisnikService, private predmetService: PredmetService, private zaposleniService: ZaposleniService, private ruter: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.trenutni = JSON.parse(localStorage.getItem('zaposleni'));
    this.predmetIzabran = JSON.parse(localStorage.getItem('predmetIzabran'));
    if (this.predmetIzabran != null) {
      this.predmetIzabranSifra = this.predmetIzabran.sifra;
      this.vidljiva = this.predmetIzabran.ispitnaPitanja.otkljucano;
    }
    this.dohvatiPredmeteZaposlenog();
  }

  fajlZaUpload: File;
  imeFajla: string;
  noviFajl: MojFajl;

  predmetIzabranSifra: string;
  predmetIzabran: Predmet;
  trenutni: Zaposleni;  
  drzePredmet: string[];
  predmeti: Predmet[];

  vidljiva: boolean;

  dohvatiPredmeteZaposlenog() {
    this.zaposleniService.dohvatiNastavnikPredmete(this.trenutni.korime).subscribe((angazovani: Angazovan[]) => {
      if (angazovani) {
        this.drzePredmet = new Array();
        this.predmeti = new Array();
        angazovani.forEach(a => {
          if (this.drzePredmet.indexOf(a.sifra) <= -1) {
            this.drzePredmet.push(a.sifra);
            this.predmetService.dohvatiPredmet(a.sifra).subscribe((predmet: Predmet) => {
              if (predmet) {
                this.predmeti.push(predmet);
              }
            });
          }
        });
      }
    });
  }

  promeni() {
    this.vidljiva = !this.vidljiva;
    this.predmetService.azurirajVidljivoIspitna(this.predmetIzabranSifra, this.vidljiva).subscribe(res => {
      if (res['poruka'] == 1) {
        this.postaviPredmet();
      }
    });
  }

  postaviPredmet() {
    this.predmetService.dohvatiPredmet(this.predmetIzabranSifra).subscribe((predmet: Predmet) => {
      if (predmet) {
        this.predmetIzabran = predmet;
        localStorage.setItem('predmetIzabran', JSON.stringify(this.predmetIzabran));
        this.predmetIzabranSifra = this.predmetIzabran.sifra;
        this.vidljiva = this.predmetIzabran.labovi.otkljucano;
        this.dohvatiPredmeteZaposlenog();
      }
    });
  }

  obrisiFajlRokovi(fajl) {
    this.predmetService.obrisiFajl(fajl.ime);
    this.predmetService.obrisiFajlPredmet(this.predmetIzabranSifra, "rokovi", fajl.ime).subscribe(res => {
      this.postaviPredmet();
    });
  }

  obrisiFajlResenja(fajl) {
    this.predmetService.obrisiFajl(fajl.ime);
    this.predmetService.obrisiFajlPredmet(this.predmetIzabranSifra, "resenja", fajl.ime).subscribe(res => {
      this.postaviPredmet();
    });
  }

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

  convertDate(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString();
    var dd  = date.getDate().toString();
  
    var mmChars = mm.split('');
    var ddChars = dd.split('');
  
    return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
  }

  dodajFajlRokovi() {
    let noviDatum = this.convertDate(new Date());
    let tip = "";
    let noviFajl = {
      ime: this.imeFajla,
      tip: tip,
      datum: noviDatum,
      kb: 0,
      dodao: this.trenutni.ime + " " + this.trenutni.prezime 
    }

    this.predmetService.fajlUpload(this.imeFajla, this.formGroup.get('file').value, noviFajl, this.predmetIzabranSifra, "rokovi", null);
    alert("Uspesno dodavanje fajla");
    this.postaviPredmet();
  }

  dodajFajlResenja() {
    let noviDatum = this.convertDate(new Date());
    let tip = "";
    let noviFajl = {
      ime: this.imeFajla,
      tip: tip,
      datum: noviDatum,
      kb: 0,
      dodao: this.trenutni.ime + " " + this.trenutni.prezime 
    }

    this.predmetService.fajlUpload(this.imeFajla, this.formGroup.get('file').value, noviFajl, this.predmetIzabranSifra, "resenja", null);
    alert("Uspesno dodavanje fajla");
    this.postaviPredmet();
  }

  odjava() {
    localStorage.setItem('korisnik', null);
    localStorage.setItem('admin', null);
    localStorage.setItem('student', null);
    localStorage.setItem('zaposleni', null);
    this.ruter.navigate(['/home']);
  }

}
