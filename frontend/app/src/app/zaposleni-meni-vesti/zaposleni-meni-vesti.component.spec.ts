import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniMeniVestiComponent } from './zaposleni-meni-vesti.component';

describe('ZaposleniMeniVestiComponent', () => {
  let component: ZaposleniMeniVestiComponent;
  let fixture: ComponentFixture<ZaposleniMeniVestiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniMeniVestiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniMeniVestiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
