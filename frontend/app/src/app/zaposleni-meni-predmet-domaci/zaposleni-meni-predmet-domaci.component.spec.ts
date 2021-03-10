import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniMeniPredmetDomaciComponent } from './zaposleni-meni-predmet-domaci.component';

describe('ZaposleniMeniPredmetDomaciComponent', () => {
  let component: ZaposleniMeniPredmetDomaciComponent;
  let fixture: ComponentFixture<ZaposleniMeniPredmetDomaciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniMeniPredmetDomaciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniMeniPredmetDomaciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
