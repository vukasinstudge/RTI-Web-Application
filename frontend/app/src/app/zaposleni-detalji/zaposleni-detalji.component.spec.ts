import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniDetaljiComponent } from './zaposleni-detalji.component';

describe('ZaposleniDetaljiComponent', () => {
  let component: ZaposleniDetaljiComponent;
  let fixture: ComponentFixture<ZaposleniDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniDetaljiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
