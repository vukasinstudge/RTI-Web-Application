import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniMeniPredmetVezbeComponent } from './zaposleni-meni-predmet-vezbe.component';

describe('ZaposleniMeniPredmetVezbeComponent', () => {
  let component: ZaposleniMeniPredmetVezbeComponent;
  let fixture: ComponentFixture<ZaposleniMeniPredmetVezbeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniMeniPredmetVezbeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniMeniPredmetVezbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
