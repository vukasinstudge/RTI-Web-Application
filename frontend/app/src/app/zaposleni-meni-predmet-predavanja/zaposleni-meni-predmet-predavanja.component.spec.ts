import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniMeniPredmetPredavanjaComponent } from './zaposleni-meni-predmet-predavanja.component';

describe('ZaposleniMeniPredmetPredavanjaComponent', () => {
  let component: ZaposleniMeniPredmetPredavanjaComponent;
  let fixture: ComponentFixture<ZaposleniMeniPredmetPredavanjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniMeniPredmetPredavanjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniMeniPredmetPredavanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
