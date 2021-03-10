import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MojFajl } from '../model/fajl.model';
import { Predmet } from '../model/predmet.model';
import { Spisak } from '../model/spisak.model';
import { Student } from '../model/student.model';
import { PredmetService } from '../predmet.service';

@Component({
  selector: 'app-predmet-domaci',
  templateUrl: './predmet-domaci.component.html',
  styleUrls: ['./predmet-domaci.component.css']
})
export class PredmetDomaciComponent implements OnInit {

  public formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  constructor(private service: PredmetService, private ruter: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.service.dohvatiPredmet(localStorage.getItem('predmetDetaljiSifra')).subscribe((predmet: Predmet) => {
      this.predmetDetalji = predmet;
      this.student = JSON.parse(localStorage.getItem('student'));
      this.vidljivoIspitna = this.predmetDetalji.ispitnaPitanja.otkljucano;
      this.vidljivoLaboratorija = this.predmetDetalji.labovi.otkljucano;
      this.dohvatiSpiskove();
  
      this.imeFajla = "";
      this.noviFajl = null;
    });
  }

  predmetDetalji: Predmet;

  vidljivoIspitna: boolean;
  vidljivoLaboratorija: boolean;

  fajlZaUpload: File;
  imeFajla: string;
  noviFajl: MojFajl;

  spiskovi: Spisak[];

  student: Student;

  preuzmi(fajl) {
    this.service.preuzmi(fajl.ime);
  }

  dohvatiSpiskove() {
    this.service.dohvatiSpiskoveStudent(this.predmetDetalji.sifra, "domaci").subscribe((spiskovi: Spisak[]) => {
      if (spiskovi) {
        this.spiskovi = spiskovi;
      }
    });
  }

  otvoren(spisak) {
    if (Date.now() < Date.parse(spisak.datum) && spisak.studenti.length < spisak.limit) return true;
    return false;
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

  priloziFajl() {
    if (this.imeFajla == "") {
      alert("Morate izabrati fajl");
      return;
    }
    let noviDatum = this.convertDate(new Date());
    let tip = "";
    this.noviFajl = {
      ime: this.imeFajla,
      tip: tip,
      datum: noviDatum,
      kb: 0,
      dodao: this.student.ime + " " + this.student.prezime 
    }
    alert("Fajl prilozen");
  }

  prijaviSeNaSpisak(spisak) {

    let prijavio = false;
    spisak.studenti.forEach(student => {
      if (student.korime == this.student.korime) prijavio = true;
    });

    if (prijavio) {
      this.service.azurirajPrijavu(spisak, this.student.korime, this.noviFajl).subscribe(res => {
        if (res['poruka'] == 1) {
          if (this.noviFajl != null) {
            this.service.fajlUpload(this.imeFajla, this.formGroup.get('file').value, this.noviFajl, this.student.korime, "spiskoviDomaci", spisak);
          }
          let poruka = "Azurirali ste svoju prijavu, fajl: ";
          if (this.noviFajl == null) poruka += "/";
          else poruka += this.imeFajla;
          alert(poruka);
          this.dohvatiSpiskove();
        }
      });
    } else {
      this.service.dodajPrijavu(spisak, this.student.korime, this.noviFajl).subscribe(res => {
        if (res['poruka'] == 1) {
          if (this.noviFajl != null) {
            this.service.fajlUpload(this.imeFajla, this.formGroup.get('file').value, this.noviFajl, this.student.korime, "spiskoviDomaci", spisak);
          }
          let poruka = "Prijavili ste se, fajl: ";
          if (this.noviFajl == null) poruka += "/";
          else poruka += this.imeFajla;
          alert(poruka);
          this.dohvatiSpiskove();
        }
      });
    }
  }

  odjava() {
    localStorage.setItem('korisnik', null);
    localStorage.setItem('admin', null);
    localStorage.setItem('student', null);
    localStorage.setItem('zaposleni', null);
    this.ruter.navigate(['/home']);
  }

}
