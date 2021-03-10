import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';
import { Zaposleni } from '../model/zaposleni.model';
import { Korisnik } from '../model/korisnik.model';
import { Student } from '../model/student.model';
import { PredmetService } from '../predmet.service';
import { Predmet } from '../model/predmet.model';
import { ZaposleniService } from '../zaposleni.service';
import { Angazovan } from '../model/angazovan.model';
import { Prati } from '../model/prati.model';
import { Kategorija } from '../model/kategorija.model';
import { Mapiranje } from '../model/mapiranje.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: KorisnikService, private predmetService: PredmetService, private zaposleniService: ZaposleniService, private ruter: Router) { }

  ngOnInit(): void {
    this.korime = "";
    this.lozinka = "";
    this.ime = "";
    this.prezime = "";
    this.adresa = "";
    this.telefon = "";
    this.sajt = "";
    this.biografija = "";
    this.zvanje = "redovni profesor";
    this.status = "aktivan";

    this.dohvatiSveKorisnike();
    this.dohvatiSvePredmete();
    this.dohvatiProfesore();
    this.dohvatiAsistente();
    this.dohvatiVanredne();
    this.dohvatiDocente();
    this.dovhatiSveAngazovane();
    this.dohvatiStudente();
    this.dohvatiPrate();
    this.dohvatiKategorije();

    this.imePredmeta = "";
    this.tip = "obavezan";
    this.semestar = null;
    this.odsek = "";
    this.sifra = "";
    this.fondPredavanja = null;
    this.fondVezbe = null;
    this.espb = null;
    this.cilj = "";
    this.terminPredavanja = "";
    this.terminVezbe = "";
    this.polaganje = "";
    this.komentar = "";
    this.brojGrupa = null;
  }

  korime: string;
  lozinka: string;
  ime: string;
  prezime: string;
  adresa: string;
  telefon: string;
  sajt: string;
  biografija: string;
  zvanje: string;
  brojKabineta: number;
  status: string;
  greska: string[];

  korisnici: Korisnik[];

  imePredmeta: string;
  tip: string;
  semestar: number;
  odsek: string;
  sifra: string;
  fondPredavanja: number;
  fondVezbe: number;
  espb: number;
  cilj: string;
  terminPredavanja: string;
  terminVezbe: string;
  polaganje: string;
  komentar: string;
  brojGrupa: number;

  predmeti: Predmet[];

  profesori: Zaposleni[];
  asistenti: Zaposleni[];
  vanredni: Zaposleni[];
  docenti: Zaposleni[];
  zaposleniAngazovanKorime: string;
  predmetAngazovanSifra: string;
  grupaAngazovan: string;
  predmetAngazovan: Predmet;
  angazovani: Angazovan[];

  studenti: Student[];
  prate: Prati[];
  studentPrati: string;
  predmetPrati: string;

  kategorije: Kategorija[];
  novoObavestenjeNaslov: string[];
  novoObavestenjeSadrzaj: string[];
  novaKategorija: string;

  mapirajNa: string;
  predmetZaMapiranje: string;

  registracijaZaposleni() {
    this.greska = [""];
    if (this.korime == "" || this.lozinka == "" || this.ime == "" || this.prezime == "" || this.adresa == "" || this.brojKabineta == null) {
      this.greska.push("Unesi sve podatke");
      return;
    }

    this.service.dodajZaposlenog(this.korime, this.lozinka, this.ime, this.prezime, this.adresa, this.telefon, this.sajt, this.biografija, this.zvanje, this.brojKabineta, this.status, "user.png").subscribe(res => {
      if (res['poruka'] == 1) {
        this.service.dodajKorisnika(this.korime, this.lozinka, "zaposleni", 0).subscribe(res => {
          if (res['poruka'] == 1) {
            alert("Registracija uspesna");
            this.dohvatiSveKorisnike();
            this.dohvatiProfesore();
            this.dohvatiAsistente();
            this.dohvatiVanredne();
            this.dohvatiDocente();
            this.ruter.navigate(['/admin']);
          } else {
            alert('Greska');
          }
        });
      } else {
        alert('Greska');
      }
    });
  }

  dohvatiSveKorisnike() {
    this.service.dohvatiSveKorisnike().subscribe((korisnici: Korisnik[]) => {
      this.korisnici = korisnici;
    });
  }

  obrisi(korisnik) {
    if (korisnik.tip == "admin") return;
    this.service.obrisiKorisnika(korisnik.korime, korisnik.tip).subscribe(res => {
      if (res['poruka'] == 1) {
        this.dohvatiSveKorisnike();
        this.dohvatiProfesore();
        this.dohvatiAsistente();
        this.dohvatiVanredne();
        this.dohvatiDocente();
        this.ruter.navigate(['/admin']);
      } else {
        alert("Greska");
      }
    });
  }

  azuriraj(korisnik) {
    if (korisnik.tip == "admin") return;
    if (korisnik.tip == "student") {
      this.service.dohvatiStudenta(korisnik.korime).subscribe((student: Student) => {
        if (student) {
          localStorage.setItem('studentAzuriraj', JSON.stringify(student));
          this.ruter.navigate(['/studentAzuriraj']);
        }
      });
    }
    if (korisnik.tip == "zaposleni") {
      this.service.dohvatiZaposlenog(korisnik.korime).subscribe((zaposleni: Zaposleni) => {
        if (zaposleni) {
          localStorage.setItem('zaposleniAzuriraj', JSON.stringify(zaposleni));
          this.ruter.navigate(['/zaposleniAzuriraj']);
        }
      });
    }
  }

  unosPredmeta() {
    this.greska = [""];
    this.predmetService.unosPredmeta(this.imePredmeta, this.tip, this.semestar, this.odsek, this.sifra, this.fondPredavanja, this.fondVezbe, this.espb, this.cilj, this.terminPredavanja, this.terminVezbe, this.polaganje, this.komentar, this.brojGrupa).subscribe(res => {
      if (res['poruka'] == 1) {
        this.dohvatiSvePredmete();
        this.ruter.navigate(['/admin']);
      }
    });
  }

  dohvatiSvePredmete() {
    this.predmetService.dohvatiSvePredmete().subscribe((predmeti: Predmet[]) => {
      this.predmeti = predmeti;
    });
  }

  azurirajPredmet(predmet) {
    this.predmetService.dohvatiPredmetSifra(predmet.sifra).subscribe((predmet: Predmet) => {
      if (predmet) {
        localStorage.setItem('predmetAzurirajAdmin', JSON.stringify(predmet));
        this.ruter.navigate(['/predmetAzurirajAdmin']);
      }
    });
  }

  obrisiPredmet(predmet) {
    this.predmetService.obrisiPredmet(predmet.sifra).subscribe(res => {
      if (res['poruka'] == 1) {
        this.dohvatiSvePredmete();
        this.ruter.navigate(['/admin']);
      } else {
        alert("Greska");
      }
    });
  }

  dohvatiProfesore() {
    this.service.dohvatiProfesore().subscribe((zaposleni: Zaposleni[]) => {
      this.profesori = zaposleni;
    });
  }

  dohvatiAsistente() {
    this.service.dohvatiAsistente().subscribe((zaposleni: Zaposleni[]) => {
      this.asistenti = zaposleni;
    });
  }

  dohvatiVanredne() {
    this.service.dohvatiVanredne().subscribe((zaposleni: Zaposleni[]) => {
      this.vanredni = zaposleni;
    });
  }

  dohvatiDocente() {
    this.service.dohvatiDocente().subscribe((zaposleni: Zaposleni[]) => {
      this.docenti = zaposleni;
    });
  }

  postaviPredmet() {
    this.predmetService.dohvatiPredmet(this.predmetAngazovanSifra).subscribe((predmet: Predmet) => {
      if (predmet) {
        this.predmetAngazovan = predmet;
      }
    });
  }

  angazujZaposlenog() {
    this.zaposleniService.angazujZaposlenog(this.zaposleniAngazovanKorime, this.predmetAngazovanSifra, this.grupaAngazovan).subscribe(res => {
      if (res['poruka'] == 1) {
        this.dovhatiSveAngazovane();
        this.ruter.navigate(['/admin']);
      }
    });
  }

  dovhatiSveAngazovane() {
    this.zaposleniService.dohvatiSveAngazovane().subscribe((angazovani: Angazovan[]) => {
      this.angazovani = angazovani;
    });
  }

  obrisiAngazman(angazovani) {
    this.zaposleniService.obrisiAngazman(angazovani.korime, angazovani.sifra, angazovani.grupa).subscribe(res => {
      if (res['poruka'] == 1) {
        this.dovhatiSveAngazovane();
        this.ruter.navigate(['/admin']);
      } else {
        alert("Greska");
      }
    });
  }

  promeniSliku(korisnik) {
    localStorage.setItem('korisnikZaPromenuSlike', JSON.stringify(korisnik));
    this.ruter.navigate(['/promenaSlike']);
  }

  dohvatiStudente() {
    this.service.dohvatiStudente().subscribe((studenti: Student[]) => {
      this.studenti = studenti;
    });
  }

  dohvatiPrate() {
    this.service.dohvatiPrate().subscribe((prate: Prati[]) => {
      this.prate = prate;
    });
  }

  dodajPrati() {
    let vecPrati = false;
    this.prate.forEach(prati => {
      if (prati.korime == this.studentPrati && prati.sifra == this.predmetPrati) vecPrati = true;
    });
    if (vecPrati) {
      alert("Student vec prati predmet");
      return;
    }
    this.predmetService.dodajPrati(this.studentPrati, this.predmetPrati).subscribe(res => {
      if (res['poruka'] == 1) {
        this.dohvatiPrate();
        this.ruter.navigate(['/admin']);
      }
    });
  }

  obrisiPrati(prati) {
    this.predmetService.obrisiPrati(prati.korime, prati.sifra).subscribe(res => {
      if (res['poruka'] == 1) {
        this.dohvatiPrate();
        this.ruter.navigate(['/admin']);
      } else {
        alert("Greska");
      }
    });
  }

  dohvatiKategorije() {
    this.service.dohvatiKategorije().subscribe((kategorije: Kategorija[]) => {
      this.kategorije = kategorije;
      this.novoObavestenjeNaslov = new Array();
      this.novoObavestenjeSadrzaj = new Array();
      this.kategorije.forEach(kat => {
        this.novoObavestenjeNaslov.push("");
        this.novoObavestenjeSadrzaj.push("");
      });
    });
  }

  dodajKategoriju() {
    this.service.dodajKategoriju(this.novaKategorija).subscribe(res => {
      if (res['poruka'] == 1) {
        this.dohvatiKategorije();
        this.ruter.navigate(['/admin']);
      }
    });
  }

  convertDate(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString();
    var dd  = date.getDate().toString();
  
    var mmChars = mm.split('');
    var ddChars = dd.split('');
  
    return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
  }

  dodajObavestenje(kategorija, indeks) {
    let novoObavestenje = {
      datum: this.convertDate(new Date()),
      naslov: this.novoObavestenjeNaslov[indeks],
      sadrzaj: this.novoObavestenjeSadrzaj[indeks]
    }
    this.service.dodajObavestenje(novoObavestenje, kategorija.ime).subscribe(res => {
      if (res['poruka'] == 1) {
        this.dohvatiKategorije();
        this.ruter.navigate(['/admin']);
      }
    });
  }

  obrisiKategoriju(kategorija) {
    this.service.obrisiKategoriju(kategorija).subscribe(res => {
      if (res['poruka'] == 1) {
        this.dohvatiKategorije();
        this.ruter.navigate(['/admin']);
      } else {
        alert("Greska");
      }
    });
  }

  obrisiObavestenje(obavestenje, ime) {
    this.service.obrisiObavestenje(obavestenje, ime).subscribe(res => {
      if (res['poruka'] == 1) {
        this.dohvatiKategorije();
        this.ruter.navigate(['/admin']);
      } else {
        alert("Greska");
      }
    });
  }

  // MAPIRANJA --------------------------------------------------------------------------------------------------

  dodajMapiranje() {
    let novoMapiranje = {
      sifraPrikaz: this.mapirajNa,
      sifraMapiran: this.predmetZaMapiranje
    }
    this.predmetService.dodajMapiranje(novoMapiranje).subscribe(res => {
      if (res['poruka'] == 1) {
        alert("Predmet uspesno mapiran");
        this.ruter.navigate(['/admin']);
      }
    });
  }

  odjava() {
    localStorage.setItem('korisnik', null);
    localStorage.setItem('admin', null);
    this.ruter.navigate(['/home']);
  }

}
