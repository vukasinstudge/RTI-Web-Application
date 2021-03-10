import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  prijava(korime) {
    const data = {
      korime: korime
    }

    return this.http.post(`${this.uri}/prijava`, data);
  }

  dodajStudenta(korime, lozinka, indeks, tipStudija, ime, prezime, status) {
    const data = {
      korime: korime,
      lozinka: lozinka,
      indeks: indeks,
      tipStudija: tipStudija,
      ime: ime,
      prezime: prezime,
      status: status
    }

    return this.http.post(`${this.uri}/dodajStudenta`, data);
  }

  dodajKorisnika(korime, lozinka, tip, promenioLozinku) {
    const data = {
      korime: korime,
      lozinka: lozinka,
      tip: tip,
      promenioLozinku: promenioLozinku
    }

    return this.http.post(`${this.uri}/dodajKorisnika`, data);
  }

  dohvatiStudenta(korime) {
    const data = {
      korime: korime
    }

    return this.http.post(`${this.uri}/dohvatiStudenta`, data);
  }

  dohvatiAdmina(korime) {
    const data = {
      korime: korime
    }

    return this.http.post(`${this.uri}/dohvatiAdmina`, data);
  }

  dohvatiZaposlenog(korime) {
    const data = {
      korime: korime
    }

    return this.http.post(`${this.uri}/dohvatiZaposlenog`, data);
  }

  dodajZaposlenog(korime, lozinka, ime, prezime, adresa, telefon, sajt, biografija, zvanje, brojKabineta, status, slika) {
    const data = {
      korime: korime,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
      telefon: telefon,
      sajt: sajt,
      biografija: biografija,
      zvanje: zvanje,
      brojKabineta: brojKabineta,
      status: status,
      slika: slika
    }

    return this.http.post(`${this.uri}/dodajZaposlenog`, data);
  }

  promeniLozinku(korime, nova, tip) {
    const data = {
      korime: korime,
      nova: nova,
      tip: tip
    }

    return this.http.post(`${this.uri}/promeniLozinku`, data);
  }

  dohvatiSveKorisnike() {
    return this.http.get(`${this.uri}/dohvatiSveKorisnike`);
  }

  obrisiKorisnika(korime, tip) {
    const data = {
      korime: korime,
      tip : tip
    }

    return this.http.post(`${this.uri}/obrisiKorisnika`, data);
  }

  azurirajKorisnika(staroKorime, korime, lozinka) {
    const data = {
      staroKorime: staroKorime,
      korime: korime,
      lozinka: lozinka
    }

    return this.http.post(`${this.uri}/azurirajKorisnika`, data);
  }

  azurirajStudenta(staroKorime, korime, lozinka, indeks, ime, prezime, tipStudija, status) {
    const data = {
      staroKorime: staroKorime,
      korime: korime,
      lozinka: lozinka,
      indeks: indeks,
      ime: ime,
      prezime: prezime,
      tipStudija: tipStudija,
      status: status
    }

    return this.http.post(`${this.uri}/azurirajStudenta`, data);
  }

  azurirajZaposlenog(staroKorime, korime, lozinka, ime, prezime, adresa, telefon, sajt, biografija, zvanje, brojKabineta, status) {
    const data = {
      staroKorime: staroKorime,
      korime: korime,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
      telefon: telefon,
      sajt: sajt,
      biografija: biografija,
      zvanje: zvanje,
      brojKabineta: brojKabineta,
      status: status
    }

    return this.http.post(`${this.uri}/azurirajZaposlenog`, data);
  }

  dohvatiProfesore() {
    return this.http.get(`${this.uri}/dohvatiProfesore`);
  }

  dohvatiAsistente() {
    return this.http.get(`${this.uri}/dohvatiAsistente`);
  }

  dohvatiVanredne() {
    return this.http.get(`${this.uri}/dohvatiVanredne`);
  }

  dohvatiDocente() {
    return this.http.get(`${this.uri}/dohvatiDocente`);
  }

  dohvatiStudente() {
    return this.http.get(`${this.uri}/dohvatiStudente`);
  }

  dohvatiPrate() {
    return this.http.get(`${this.uri}/dohvatiPrate`);
  }

  // OBAVESTENJA ADMIN -------------------------------------------------------------------------------------------------------------------

  dohvatiKategorije() {
    return this.http.get(`${this.uri}/dohvatiKategorije`);
  }

  dodajKategoriju(ime) {
    const data = {
      ime: ime
    }

    return this.http.post(`${this.uri}/dodajKategoriju`, data);
  }

  dodajObavestenje(novoObavestenje, ime) {
    const data = {
      novoObavestenje: novoObavestenje,
      ime: ime
    }

    return this.http.post(`${this.uri}/dodajObavestenje`, data);
  }

  obrisiKategoriju(kategorija) {
    const data = {
      kategorija: kategorija
    }

    return this.http.post(`${this.uri}/obrisiKategoriju`, data);
  }

  obrisiObavestenje(obavestenje, ime) {
    const data = {
      obavestenje: obavestenje,
      ime: ime
    }

    return this.http.post(`${this.uri}/obrisiObavestenjeGlobal`, data);
  }
  
}
