import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetLaboratorijaComponent } from './predmet-laboratorija.component';

describe('PredmetLaboratorijaComponent', () => {
  let component: PredmetLaboratorijaComponent;
  let fixture: ComponentFixture<PredmetLaboratorijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetLaboratorijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetLaboratorijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
