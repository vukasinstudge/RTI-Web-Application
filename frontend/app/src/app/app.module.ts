import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { ZaposleniComponent } from './zaposleni/zaposleni.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor'; 
import { RegisterstudentComponent } from './registerstudent/registerstudent.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { ZaposleniDetaljiComponent } from './zaposleni-detalji/zaposleni-detalji.component';
import { StudentAzurirajComponent } from './student-azuriraj/student-azuriraj.component';
import { ZaposleniAzurirajComponent } from './zaposleni-azuriraj/zaposleni-azuriraj.component';
import { OsnovneStudijeComponent } from './osnovne-studije/osnovne-studije.component';
import { PredmetObavestenjaComponent } from './predmet-obavestenja/predmet-obavestenja.component';
import { PredmetInformacijeComponent } from './predmet-informacije/predmet-informacije.component';
import { PredmetPredavanjaComponent } from './predmet-predavanja/predmet-predavanja.component';
import { PredmetVezbeComponent } from './predmet-vezbe/predmet-vezbe.component';
import { PredmetIspitnaComponent } from './predmet-ispitna/predmet-ispitna.component';
import { PredmetLaboratorijaComponent } from './predmet-laboratorija/predmet-laboratorija.component';
import { PredmetDomaciComponent } from './predmet-domaci/predmet-domaci.component';
import { PredmetAzurirajAdminComponent } from './predmet-azuriraj-admin/predmet-azuriraj-admin.component';
import { ZaposleniMeniComponent } from './zaposleni-meni/zaposleni-meni.component';
import { ZaposleniMeniPredmetiComponent } from './zaposleni-meni-predmeti/zaposleni-meni-predmeti.component';
import { ZaposleniMeniVestiComponent } from './zaposleni-meni-vesti/zaposleni-meni-vesti.component';
import { ZaposleniMeniPredmetPredavanjaComponent } from './zaposleni-meni-predmet-predavanja/zaposleni-meni-predmet-predavanja.component';
import { ZaposleniMeniPredmetVezbeComponent } from './zaposleni-meni-predmet-vezbe/zaposleni-meni-predmet-vezbe.component';
import { ZaposleniMeniPredmetIspitnaComponent } from './zaposleni-meni-predmet-ispitna/zaposleni-meni-predmet-ispitna.component';
import { ZaposleniMeniPredmetLaboratorijaComponent } from './zaposleni-meni-predmet-laboratorija/zaposleni-meni-predmet-laboratorija.component';
import { ZaposleniMeniPredmetDomaciComponent } from './zaposleni-meni-predmet-domaci/zaposleni-meni-predmet-domaci.component';
import { PromenaSlikeComponent } from './promena-slike/promena-slike.component';
import { OtvoriSpisakComponent } from './otvori-spisak/otvori-spisak.component';
import { SpisakDetaljiComponent } from './spisak-detalji/spisak-detalji.component';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';
import { ProjektiComponent } from './projekti/projekti.component';
import { NaukaComponent } from './nauka/nauka.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { MasterStudijeComponent } from './master-studije/master-studije.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AdminComponent,
    StudentComponent,
    ZaposleniComponent,
    RegisterstudentComponent,
    PromenaLozinkeComponent,
    ZaposleniDetaljiComponent,
    StudentAzurirajComponent,
    ZaposleniAzurirajComponent,
    OsnovneStudijeComponent,
    PredmetObavestenjaComponent,
    PredmetInformacijeComponent,
    PredmetPredavanjaComponent,
    PredmetVezbeComponent,
    PredmetIspitnaComponent,
    PredmetLaboratorijaComponent,
    PredmetDomaciComponent,
    PredmetAzurirajAdminComponent,
    ZaposleniMeniComponent,
    ZaposleniMeniPredmetiComponent,
    ZaposleniMeniVestiComponent,
    ZaposleniMeniPredmetPredavanjaComponent,
    ZaposleniMeniPredmetVezbeComponent,
    ZaposleniMeniPredmetIspitnaComponent,
    ZaposleniMeniPredmetLaboratorijaComponent,
    ZaposleniMeniPredmetDomaciComponent,
    PromenaSlikeComponent,
    OtvoriSpisakComponent,
    SpisakDetaljiComponent,
    ObavestenjaComponent,
    ProjektiComponent,
    NaukaComponent,
    KontaktComponent,
    MasterStudijeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
