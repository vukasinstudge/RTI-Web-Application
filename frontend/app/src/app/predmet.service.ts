import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PredmetService {

  constructor(private http: HttpClient) { }

  private fajlovi: string[] = new Array<string>();
  private fajlovi$: Subject<string[]> = new Subject<string[]>();
  private prikaz$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  uri = 'http://localhost:4000'

  dohvatiPredmete(semestar, odsek) {
    const data = {
      odsek: odsek,
      semestar: semestar
    }
    return this.http.post(`${this.uri}/dohvatiPredmete`, data);
  }

  unosPredmeta(imePredmeta, tip, semestar, odsek, sifra, fondPredavanja, fondVezbe, espb, cilj, terminPredavanja, terminVezbe, polaganje, komentar, brojGrupa) {
    const data = {
      imePredmeta: imePredmeta,
      tip: tip,
      semestar: semestar,
      odsek: odsek,
      sifra: sifra,
      fondPredavanja: fondPredavanja,
      fondVezbe: fondVezbe,
      espb: espb,
      cilj: cilj,
      terminPredavanja: terminPredavanja,
      terminVezbe: terminVezbe,
      polaganje: polaganje,
      komentar: komentar,
      brojGrupa: brojGrupa
    }

    return this.http.post(`${this.uri}/unosPredmeta`, data);
  }

  dohvatiSvePredmete() {
    return this.http.get(`${this.uri}/dohvatiSvePredmete`);
  }

  obrisiPredmet(sifra) {
    const data = {
      sifra: sifra
    }

    return this.http.post(`${this.uri}/obrisiPredmet`, data);
  }

  dohvatiPredmetSifra(sifra) {
    const data = {
      sifra: sifra
    }

    return this.http.post(`${this.uri}/dohvatiPredmetSifra`, data);
  }

  azurirajPredmet(staraSifra, ime, tip, semestar, odsek, sifra, fondPredavanja, fondVezbe, espb, cilj, terminPredavanja, terminVezbe, polaganje, komentar, brojGrupa) {
    const data = {
      staraSifra: staraSifra,
      ime: ime,
      tip: tip,
      semestar: semestar,
      odsek: odsek,
      sifra: sifra,
      fondPredavanja: fondPredavanja,
      fondVezbe: fondVezbe,
      espb: espb,
      cilj: cilj,
      terminPredavanja: terminPredavanja,
      terminVezbe: terminVezbe,
      polaganje: polaganje,
      komentar: komentar,
      brojGrupa: brojGrupa
    }

    return this.http.post(`${this.uri}/azurirajPredmetAdmin`, data);
  }

  dohvatiPredmet(sifra) {
    const data = {
      sifra: sifra
    }

    return this.http.post(`${this.uri}/dohvatiPredmet`, data);
  }

  azurirajOsnovneInformacije(osnovneInformacije, sifra) {
    const data = {
      osnovneInformacije: osnovneInformacije,
      sifra: sifra
    }

    return this.http.post(`${this.uri}/azurirajOsnovneInformacije`, data);
  }

  azurirajNazivLaba(labNazivStari, labNaziv, sifra, indeks) {
    const data = {
      labNazivStari: labNazivStari,
      labNaziv: labNaziv,
      sifra: sifra,
      indeks: indeks
    }

    return this.http.post(`${this.uri}/azurirajNazivLaba`, data);
  }

  obrisiLab(labNaziv, sifra) {
    const data = {
      labNaziv: labNaziv,
      sifra: sifra
    }

    return this.http.post(`${this.uri}/obrisiLab`, data);
  }

  dodajLab(noviLabNaziv, sifra) {
    const data = {
      noviLabNaziv: noviLabNaziv,
      sifra: sifra
    }

    return this.http.post(`${this.uri}/dodajLab`, data);
  }

  azurirajInformacijeDomaceg(informacijeDomaciStare, informacijeDomaci, sifra, indeks) {
    const data = {
      informacijeDomaciStare: informacijeDomaciStare,
      informacijeDomaci: informacijeDomaci,
      sifra: sifra,
      indeks: indeks
    }

    return this.http.post(`${this.uri}/azurirajInformacijeDomaceg`, data);
  }

  obrisiDomaci(informacijeDomaci, sifra) {
    const data = {
      informacijeDomaci: informacijeDomaci,
      sifra: sifra
    }

    return this.http.post(`${this.uri}/obrisiDomaci`, data);
  }

  dodajDomaci(informacijeNoviDomaci, sifra) {
    const data = {
      informacijeNoviDomaci: informacijeNoviDomaci,
      sifra: sifra
    }

    return this.http.post(`${this.uri}/dodajDomaci`, data);
  }

  azurirajVidljivoIspitna(sifra, vidljiva) {
    const data = {
      sifra: sifra,
      vidljiva: vidljiva
    }

    return this.http.post(`${this.uri}/azurirajVidljivoIspitna`, data);
  }

  azurirajVidljivoLaboratorija(sifra, vidljiva) {
    const data = {
      sifra: sifra,
      vidljiva: vidljiva
    }

    return this.http.post(`${this.uri}/azurirajVidljivoLaboratorija`, data);
  }

  azurirajVidljivoDomaci(sifra, vidljiva) {
    const data = {
      sifra: sifra,
      vidljiva: vidljiva
    }

    return this.http.post(`${this.uri}/azurirajVidljivoDomaci`, data);
  }

  unesiObavestenje(datum, naslov, sadrzaj, napisao, sifra, dodatiFajlovi) {
    const data = {
      datum: datum,
      naslov: naslov,
      sadrzaj: sadrzaj,
      napisao: napisao,
      sifra: sifra,
      dodatiFajlovi: dodatiFajlovi
    }

    return this.http.post(`${this.uri}/unesiObavestenje`, data);
  }

  azurirajObavestenje(obavestenjaNaslovStari, obavestenjaNaslov, obavestenjaSadrzajStari, obavestenjaSadrzaj, sifra) {
    const data = {
      obavestenjaNaslovStari: obavestenjaNaslovStari,
      obavestenjaNaslov: obavestenjaNaslov,
      obavestenjaSadrzajStari: obavestenjaSadrzajStari,
      obavestenjaSadrzaj: obavestenjaSadrzaj,
      sifra: sifra
    }

    return this.http.post(`${this.uri}/azurirajObavestenje`, data);
  }

  obrisiObavestenje(obavestenjaNaslov, obavestenjaSadrzaj, sifra) {
    const data = {
      obavestenjaNaslov: obavestenjaNaslov,
      obavestenjaSadrzaj: obavestenjaSadrzaj,
      sifra: sifra
    }

    return this.http.post(`${this.uri}/obrisiObavestenje`, data);
  }

  public isLoading(): Observable<boolean> {
    return this.prikaz$;
  }

  fajlUpload(imeFajla, sadrzaj, noviFajl, sifra, sekcija, spisakObjekat) {
    const data = {
      imeFajla: imeFajla,
      sadrzaj: sadrzaj,
      noviFajl: noviFajl,
      sifra: sifra,
      sekcija: sekcija,
      spisakObjekat: spisakObjekat
    }
    this.prikaz$.next(true);    
    this.http.put(`${this.uri}/fajlovi`, data).pipe(finalize(() => this.prikaz$.next(false))).subscribe(res => {
      this.fajlovi.push(imeFajla);
      this.fajlovi$.next(this.fajlovi);
    }, error => {
      this.prikaz$.next(false);
    });
  }

  preuzmi(imeFajla) {
    this.http.get(`${this.uri}/fajlovi/${imeFajla}`, { responseType: 'blob'}).subscribe(res => {
      window.open(window.URL.createObjectURL(res));
    });
  }

  obrisiFajl(imeFajla) {
    this.http.delete(`${this.uri}/fajlovi/${imeFajla}`).subscribe(() => {
      this.fajlovi.splice(this.fajlovi.findIndex(name => name === imeFajla), 1);
      this.fajlovi$.next(this.fajlovi);
    });
  }

  obrisiFajlPredmet(sifra, sekcija, ime) {
    const data = {
      sifra: sifra, 
      sekcija: sekcija, 
      ime: ime
    }
    return this.http.post(`${this.uri}/obrisiFajlPredmet`, data);
  }

  list(): Observable<string[]> {
    return this.fajlovi$;
  }

  addFileToList(imeFajla) {
    this.fajlovi.push(imeFajla);
    this.fajlovi$.next(this.fajlovi);
  }

  otvoriSpisak(otvorio, naziv, termin, mesto, limit, datum, obaveza, nazivObaveze, sifra, studenti) {
    const data = {
      otvorio: otvorio,
      naziv: naziv,
      termin: termin,
      mesto: mesto,
      limit: limit,
      datum: datum,
      obaveza: obaveza,
      nazivObaveze: nazivObaveze,
      sifra: sifra,
      studenti: studenti,
    }

    return this.http.post(`${this.uri}/otvoriSpisak`, data);
  }

  dohvatiSpiskove(korime, sifra, obaveza) {
    const data = {
      korime: korime,
      sifra: sifra,
      obaveza: obaveza
    }

    return this.http.post(`${this.uri}/dohvatiSpiskove`, data);
  }

  dohvatiSpiskoveStudent(sifra, obaveza) {
    const data = {
      sifra: sifra,
      obaveza: obaveza
    }

    return this.http.post(`${this.uri}/dohvatiSpiskoveStudent`, data);
  }

  zatvoriSpisak(spisak, noviDatum) {
    const data = {
      spisakObjekat: spisak,
      noviDatum: noviDatum
    }

    return this.http.post(`${this.uri}/zatvoriSpisak`, data);
  }

  obrisiSpisak(spisak) {
    const data = {
      spisakObjekat: spisak
    }

    return this.http.post(`${this.uri}/obrisiSpisak`, data);
  }

  azurirajPrijavu(spisak, korime, noviFajl) {
    const data = {
      spisak: spisak,
      korime: korime,
      noviFajl: noviFajl
    }

    return this.http.post(`${this.uri}/azurirajPrijavu`, data);
  }

  dodajPrijavu(spisak, korime, noviFajl) {
    const data = {
      spisak: spisak,
      korime: korime,
      noviFajl: noviFajl
    }

    return this.http.post(`${this.uri}/dodajPrijavu`, data);
  }

  // PRATI -----------------------------------------------------------------------------------------------------------------------------------

  dodajPrati(korime, sifra) {
    const data = {
      korime: korime,
      sifra: sifra
    }

    return this.http.post(`${this.uri}/dodajPrati`, data);
  }

  obrisiPrati(korime, sifra) {
    const data = {
      korime: korime,
      sifra: sifra
    }

    return this.http.post(`${this.uri}/obrisiPrati`, data);
  }

// MAPIRANJA -----------------------------------------------------------------------------------------------------------------------------------

dohvatiMapiranja() {
  return this.http.get(`${this.uri}/dohvatiMapiranja`);
}

dodajMapiranje(mapiranje) {
  const data = {
    mapiranje: mapiranje
  }

  return this.http.post(`${this.uri}/dodajMapiranje`, data);
}

}
