import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZaposleniService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  dohvatiZaposlene() {
    return this.http.get(`${this.uri}/dohvatiZaposlene`);
  }

  angazujZaposlenog(korime, sifra, grupa) {
    const data = {
      korime: korime,
      sifra: sifra,
      grupa: grupa
    }

    return this.http.post(`${this.uri}/angazujZaposlenog`, data);
  }

  dohvatiSveAngazovane() {
    return this.http.get(`${this.uri}/dohvatiSveAngazovane`);
  }

  obrisiAngazman(korime, sifra, grupa) {
    const data = {
      korime: korime,
      sifra: sifra,
      grupa: grupa
    }

    return this.http.post(`${this.uri}/obrisiAngazman`, data);
  }

  dohvatiNastavnike(sifra) {
    const data = {
      sifra: sifra
    }

    return this.http.post(`${this.uri}/dohvatiNastavnike`, data);
  }

  dohvatiNastavnikPredmete(korime) {
    const data = {
      korime: korime
    }

    return this.http.post(`${this.uri}/dohvatiNastavnikPredmete`, data);
  }

  promeniSliku(korime, imeFajla) {
    const data = {
      korime: korime,
      imeFajla: imeFajla
    }

    return this.http.post(`${this.uri}/promeniSliku`, data);
  }

}
