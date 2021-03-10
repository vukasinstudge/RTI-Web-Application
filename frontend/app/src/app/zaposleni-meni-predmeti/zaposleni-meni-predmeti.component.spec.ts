import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniMeniPredmetiComponent } from './zaposleni-meni-predmeti.component';

describe('ZaposleniMeniPredmetiComponent', () => {
  let component: ZaposleniMeniPredmetiComponent;
  let fixture: ComponentFixture<ZaposleniMeniPredmetiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniMeniPredmetiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniMeniPredmetiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
