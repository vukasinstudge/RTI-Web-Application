import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { MasterStudijeComponent } from './master-studije/master-studije.component';
import { NaukaComponent } from './nauka/nauka.component';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';
import { OsnovneStudijeComponent } from './osnovne-studije/osnovne-studije.component';
import { OtvoriSpisakComponent } from './otvori-spisak/otvori-spisak.component';
import { PredmetAzurirajAdminComponent } from './predmet-azuriraj-admin/predmet-azuriraj-admin.component';
import { PredmetDomaciComponent } from './predmet-domaci/predmet-domaci.component';
import { PredmetInformacijeComponent } from './predmet-informacije/predmet-informacije.component';
import { PredmetIspitnaComponent } from './predmet-ispitna/predmet-ispitna.component';
import { PredmetLaboratorijaComponent } from './predmet-laboratorija/predmet-laboratorija.component';
import { PredmetObavestenjaComponent } from './predmet-obavestenja/predmet-obavestenja.component';
import { PredmetPredavanjaComponent } from './predmet-predavanja/predmet-predavanja.component';
import { PredmetVezbeComponent } from './predmet-vezbe/predmet-vezbe.component';
import { ProjektiComponent } from './projekti/projekti.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { PromenaSlikeComponent } from './promena-slike/promena-slike.component';
import { RegisterstudentComponent } from './registerstudent/registerstudent.component';
import { SpisakDetaljiComponent } from './spisak-detalji/spisak-detalji.component';
import { StudentAzurirajComponent } from './student-azuriraj/student-azuriraj.component';
import { ZaposleniAzurirajComponent } from './zaposleni-azuriraj/zaposleni-azuriraj.component';
import { ZaposleniDetaljiComponent } from './zaposleni-detalji/zaposleni-detalji.component';
import { ZaposleniMeniPredmetDomaciComponent } from './zaposleni-meni-predmet-domaci/zaposleni-meni-predmet-domaci.component';
import { ZaposleniMeniPredmetIspitnaComponent } from './zaposleni-meni-predmet-ispitna/zaposleni-meni-predmet-ispitna.component';
import { ZaposleniMeniPredmetLaboratorijaComponent } from './zaposleni-meni-predmet-laboratorija/zaposleni-meni-predmet-laboratorija.component';
import { ZaposleniMeniPredmetPredavanjaComponent } from './zaposleni-meni-predmet-predavanja/zaposleni-meni-predmet-predavanja.component';
import { ZaposleniMeniPredmetVezbeComponent } from './zaposleni-meni-predmet-vezbe/zaposleni-meni-predmet-vezbe.component';
import { ZaposleniMeniPredmetiComponent } from './zaposleni-meni-predmeti/zaposleni-meni-predmeti.component';
import { ZaposleniMeniVestiComponent } from './zaposleni-meni-vesti/zaposleni-meni-vesti.component';
import { ZaposleniMeniComponent } from './zaposleni-meni/zaposleni-meni.component';
import { ZaposleniComponent } from './zaposleni/zaposleni.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'registerstudent', component: RegisterstudentComponent },
  { path: 'promenaLozinke', component: PromenaLozinkeComponent },
  { path: 'zaposleni', component: ZaposleniComponent },
  { path: 'zaposleniDetalji', component: ZaposleniDetaljiComponent },
  { path: 'studentAzuriraj', component: StudentAzurirajComponent },
  { path: 'zaposleniAzuriraj', component: ZaposleniAzurirajComponent },
  { path: 'osnovneStudije', component: OsnovneStudijeComponent },
  { path: 'predmetObavestenja', component: PredmetObavestenjaComponent },
  { path: 'predmetInformacije', component: PredmetInformacijeComponent },
  { path: 'predmetPredavanja', component: PredmetPredavanjaComponent },
  { path: 'predmetVezbe', component: PredmetVezbeComponent },
  { path: 'predmetIspitna', component: PredmetIspitnaComponent },
  { path: 'predmetLaboratorija', component: PredmetLaboratorijaComponent },
  { path: 'predmetDomaci', component: PredmetDomaciComponent },
  { path: 'predmetAzurirajAdmin', component: PredmetAzurirajAdminComponent },
  { path: 'zaposleniMeni', component: ZaposleniMeniComponent },
  { path: 'zaposleniMeniPredmeti', component: ZaposleniMeniPredmetiComponent },
  { path: 'zaposleniMeniVesti', component: ZaposleniMeniVestiComponent },
  { path: 'zaposleniMeniPredmetPredavanja', component: ZaposleniMeniPredmetPredavanjaComponent },
  { path: 'zaposleniMeniPredmetVezbe', component: ZaposleniMeniPredmetVezbeComponent },
  { path: 'zaposleniMeniPredmetIspitna', component: ZaposleniMeniPredmetIspitnaComponent },
  { path: 'zaposleniMeniPredmetLaboratorija', component: ZaposleniMeniPredmetLaboratorijaComponent },
  { path: 'zaposleniMeniPredmetDomaci', component: ZaposleniMeniPredmetDomaciComponent },
  { path: 'promenaSlike', component: PromenaSlikeComponent },
  { path: 'otvoriSpisak', component: OtvoriSpisakComponent },
  { path: 'spisakDetalji', component: SpisakDetaljiComponent },
  { path: 'obavestenja', component: ObavestenjaComponent },
  { path: 'masterStudije', component: MasterStudijeComponent },
  { path: 'projekti', component: ProjektiComponent },
  { path: 'nauka', component: NaukaComponent },
  { path: 'kontakt', component: KontaktComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
