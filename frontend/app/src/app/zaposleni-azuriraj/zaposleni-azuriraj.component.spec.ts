import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniAzurirajComponent } from './zaposleni-azuriraj.component';

describe('ZaposleniAzurirajComponent', () => {
  let component: ZaposleniAzurirajComponent;
  let fixture: ComponentFixture<ZaposleniAzurirajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniAzurirajComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniAzurirajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
