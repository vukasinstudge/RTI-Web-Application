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
  selector: 'app-zaposleni-meni-vesti',
  templateUrl: './zaposleni-meni-vesti.component.html',
  styleUrls: ['./zaposleni-meni-vesti.component.css']
})
export class ZaposleniMeniVestiComponent implements OnInit {

  public formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  constructor(private korisnikService: KorisnikService, private predmetService: PredmetService, private zaposleniService: ZaposleniService, private ruter: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.trenutni = JSON.parse(localStorage.getItem('zaposleni'));
    this.dohvatiPredmeteZaposlenog();
    this.dodatiFajlovi = new Array();
    this.imeFajla = new Array();
    this.fajloviCekaju = new Array();
  }

  naslov: string;
  datum: Date;
  sadrzaj: string;
  predmetIzabranSifra: string;

  trenutni: Zaposleni;

  drzePredmet: string[];
  predmeti: Predmet[];

  obavestenja: Object[];

  obavestenjaNaslov: string[];
  obavestenjaSadrzaj: string[];
  obavestenjaNaslovStari: string[];
  obavestenjaSadrzajStari: string[];
  obavestenjaDatum: string[];
  obavestenjaPredmet: Predmet[];

  dodatiFajlovi: Object[];
  fajlZaUpload: File;
  fajloviCekaju: File[];
  imeFajla: string[];

  imeFajlaTrenutno: string;

  dohvatiPredmeteZaposlenog() {
    this.zaposleniService.dohvatiNastavnikPredmete(this.trenutni.korime).subscribe((angazovani: Angazovan[]) => {
      if (angazovani) {
        this.drzePredmet = new Array();
        this.predmeti = new Array();

        this.obavestenja = new Array();

        this.obavestenjaNaslov = new Array();
        this.obavestenjaSadrzaj = new Array();
        this.obavestenjaNaslovStari = new Array();
        this.obavestenjaSadrzajStari = new Array();
        this.obavestenjaDatum = new Array();
        this.obavestenjaPredmet = new Array();

        let num = 0;

        angazovani.forEach(a => {
          if (this.drzePredmet.indexOf(a.sifra) <= -1) {
            this.drzePredmet.push(a.sifra);
            this.predmetService.dohvatiPredmet(a.sifra).subscribe((predmet: Predmet) => {
              if (predmet) {
                this.predmeti.push(predmet);
                for (let j = 0; j < predmet.obavestenja.length; j++) {
                  if ((predmet.obavestenja[j] as any).napisao == this.trenutni.korime) {
                    
                    this.obavestenja[num] = (predmet.obavestenja[j] as any);
          
                    this.obavestenjaNaslov[num] = (predmet.obavestenja[j] as any).naslov;
                    this.obavestenjaSadrzaj[num] = (predmet.obavestenja[j] as any).sadrzaj;
                    this.obavestenjaDatum[num] = (predmet.obavestenja[j] as any).datum;
                    this.obavestenjaPredmet[num] = predmet;
          
                    this.obavestenjaNaslovStari[num] = this.obavestenjaNaslov[num];
                    this.obavestenjaSadrzajStari[num] = this.obavestenjaSadrzaj[num];
          
                    num++;
                  }
                }
              }
            });
          }
        });
      }
    });
  }

  unesiObavestenje() {
    this.predmetService.unesiObavestenje(this.datum.toString(), this.naslov, this.sadrzaj, this.trenutni.korime, this.predmetIzabranSifra,  this.dodatiFajlovi).subscribe(res => {
      if (res['poruka'] == 1) {
        for (let i = 0; i < this.dodatiFajlovi.length; i++) { 
          this.predmetService.fajlUpload(this.imeFajla[i], this.fajloviCekaju[i], this.dodatiFajlovi[i], this.predmetIzabranSifra, "obavestenje", this.naslov);
        }
        alert("Uspesno uneto obavestenje");
        this.dohvatiPredmeteZaposlenog();
        this.dodatiFajlovi = new Array();
        this.imeFajla = new Array();
        this.fajloviCekaju = new Array();
      }
    });
  }

  azurirajObavestenje(indeks) {
    this.predmetService.azurirajObavestenje(this.obavestenjaNaslovStari[indeks], this.obavestenjaNaslov[indeks], this.obavestenjaSadrzajStari[indeks], this.obavestenjaSadrzaj[indeks], this.obavestenjaPredmet[indeks].sifra).subscribe(res => {
      if (res['poruka'] == 1) {
        this.dohvatiPredmeteZaposlenog();
        alert("Izmene su unete");
      }
    });
  }

  obrisiObavestenje(indeks) {
    this.predmetService.obrisiObavestenje(this.obavestenjaNaslovStari[indeks], this.obavestenjaSadrzajStari[indeks], this.obavestenjaPredmet[indeks].sifra).subscribe(res => {
      if (res['poruka'] == 1) {
        this.dohvatiPredmeteZaposlenog();
      } else {
        alert("Greska");
      }
    });
  }

  public promenaFajla(event) {
    const reader = new FileReader();
  
    if (event.target.files && event.target.files.length) {
      this.imeFajlaTrenutno = event.target.files[0].name;
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

  dodajFajlObavestenje() {
    let noviDatum = this.convertDate(new Date());
    let tip = "";
    let noviFajl = {
      ime: this.imeFajlaTrenutno,
      tip: tip,
      datum: noviDatum,
      kb: 0,
      dodao: this.trenutni.ime + " " + this.trenutni.prezime 
    }

    this.imeFajla.push(this.imeFajlaTrenutno);
    this.fajloviCekaju.push(this.formGroup.get('file').value);
    this.dodatiFajlovi.push(noviFajl);
  }

  odjava() {
    localStorage.setItem('korisnik', null);
    localStorage.setItem('admin', null);
    localStorage.setItem('student', null);
    localStorage.setItem('zaposleni', null);
    this.ruter.navigate(['/home']);
  }

}
