import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniMeniPredmetLaboratorijaComponent } from './zaposleni-meni-predmet-laboratorija.component';

describe('ZaposleniMeniPredmetLaboratorijaComponent', () => {
  let component: ZaposleniMeniPredmetLaboratorijaComponent;
  let fixture: ComponentFixture<ZaposleniMeniPredmetLaboratorijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniMeniPredmetLaboratorijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniMeniPredmetLaboratorijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
