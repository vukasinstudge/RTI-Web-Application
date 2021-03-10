import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Angazovan } from '../model/angazovan.model';
import { MojFajl } from '../model/fajl.model';
import { Predmet } from '../model/predmet.model';
import { Spisak } from '../model/spisak.model';
import { Zaposleni } from '../model/zaposleni.model';
import { PredmetService } from '../predmet.service';
import { ZaposleniService } from '../zaposleni.service';

@Component({
  selector: 'app-zaposleni-meni-predmet-domaci',
  templateUrl: './zaposleni-meni-predmet-domaci.component.html',
  styleUrls: ['./zaposleni-meni-predmet-domaci.component.css']
})
export class ZaposleniMeniPredmetDomaciComponent implements OnInit {

  public formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  constructor(private korisnikService: KorisnikService, private predmetService: PredmetService, private zaposleniService: ZaposleniService, private ruter: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.trenutni = JSON.parse(localStorage.getItem('zaposleni'));
    this.predmetIzabran = JSON.parse(localStorage.getItem('predmetIzabran'));
    if (this.predmetIzabran != null) {
      this.predmetIzabranSifra = this.predmetIzabran.sifra;
      this.vidljiva = this.predmetIzabran.domaci.otkljucano;
      this.dohvatiDomace();
      this.dohvatiSpiskove();
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

  informacijeDomaci: string[];
  informacijeDomaciStare: string[];

  informacijeNoviDomaci: string;

  vidljiva: boolean;

  spiskovi: Spisak[];

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

  postaviPredmet() {
    this.predmetService.dohvatiPredmet(this.predmetIzabranSifra).subscribe((predmet: Predmet) => {
      if (predmet) {
        this.predmetIzabran = predmet;
        this.vidljiva = this.predmetIzabran.domaci.otkljucano;
        localStorage.setItem('predmetIzabran', JSON.stringify(this.predmetIzabran));
        this.predmetIzabranSifra = this.predmetIzabran.sifra;
        this.dohvatiDomace();
      }
    });
  }

  dohvatiDomace() {
    this.informacijeDomaci = new Array();
    let i = 0;
    this.predmetIzabran.domaci.domaciZadaci.forEach(dom => {
      this.informacijeDomaci[i] = (dom as any).informacije;
      i++;
    });
    this.informacijeDomaciStare = new Array();
    for (let i = 0; i < this.informacijeDomaci.length; i++) {
      this.informacijeDomaciStare[i] = this.informacijeDomaci[i];
    }
  }

  azurirajDomaci(indeks) {
    this.predmetService.azurirajInformacijeDomaceg(this.informacijeDomaciStare[indeks], this.informacijeDomaci[indeks], this.predmetIzabranSifra, indeks).subscribe(res => {
      if (res['poruka'] == 1) {
        this.postaviPredmet();
        alert("Izmene su unete");
      }
    });
  }

  obrisiDomaci(indeks) {
    this.predmetService.obrisiDomaci(this.informacijeDomaci[indeks], this.predmetIzabranSifra).subscribe(res => {
      if (res['poruka'] == 1) {
        this.postaviPredmet();
      } else {
        alert("Greska");
      }
    });
  }

  dodajDomaci() {
    this.predmetService.dodajDomaci(this.informacijeNoviDomaci, this.predmetIzabranSifra).subscribe(res => {
      if (res['poruka'] == 1) {
        this.postaviPredmet();
      }
    });
  }

  promeni() {
    this.vidljiva = !this.vidljiva;
    this.predmetService.azurirajVidljivoDomaci(this.predmetIzabranSifra, this.vidljiva).subscribe(res => {
      if (res['poruka'] == 1) {
        this.postaviPredmet();
      }
    });
  }

  obrisiFajlDomaci(fajl, informacije) {
    let sekcija = "d." + informacije; 
    this.predmetService.obrisiFajl(fajl.ime);
    this.predmetService.obrisiFajlPredmet(this.predmetIzabranSifra, sekcija, fajl.ime).subscribe(res => {
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

  dodajFajlDomaci(informacije) {
    let noviDatum = this.convertDate(new Date());
    let tip = "";
    let noviFajl = {
      ime: this.imeFajla,
      tip: tip,
      datum: noviDatum,
      kb: 0,
      dodao: this.trenutni.ime + " " + this.trenutni.prezime 
    }

    let sekcija = "d." + informacije; 

    this.predmetService.fajlUpload(this.imeFajla, this.formGroup.get('file').value, noviFajl, this.predmetIzabranSifra, sekcija, null);
    alert("Uspesno dodavanje fajla");
    this.postaviPredmet();
  }

  otvoriSpisakDomaci(indeks) {
    localStorage.setItem("obaveza", "domaci");
    localStorage.setItem("nazivObaveze", this.informacijeDomaci[indeks]);
    localStorage.setItem("sifra", this.predmetIzabranSifra);
    localStorage.setItem("otvorio", this.trenutni.korime);
    this.ruter.navigate(['/otvoriSpisak']);
  }

  dohvatiSpiskove() {
    this.predmetService.dohvatiSpiskove(this.trenutni.korime, this.predmetIzabranSifra, "domaci").subscribe((spiskovi: Spisak[]) => {
      if (spiskovi) {
        this.spiskovi = spiskovi;
      }
    });
  }

  otvoren(spisak) {
    if (Date.now() < Date.parse(spisak.datum) && spisak.studenti.length < spisak.limit) return true;
    return false;
  }

  zatvoriSpisak(spisak) {
    this.predmetService.zatvoriSpisak(spisak, "2020-01-01").subscribe(res => {
      if (res['poruka'] == 1) {
        this.dohvatiSpiskove();
      }
    });
  }

  obrisiSpisak(spisak) {
    this.predmetService.obrisiSpisak(spisak).subscribe(res => {
      if (res['poruka'] == 1) {
        this.dohvatiSpiskove();
      } else {
        alert("Greska");
      }
    });
  }

  spisakDetalji(spisak) {
    localStorage.setItem('spisak', JSON.stringify(spisak));
    localStorage.setItem('dosaoSa', 'dosaoSaDomaceg');
    this.ruter.navigate(['/spisakDetalji']);
  }

  odjava() {
    localStorage.setItem('korisnik', null);
    localStorage.setItem('admin', null);
    localStorage.setItem('student', null);
    localStorage.setItem('zaposleni', null);
    this.ruter.navigate(['/home']);
  }


}
