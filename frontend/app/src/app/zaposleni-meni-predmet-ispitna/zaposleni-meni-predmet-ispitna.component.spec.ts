import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniMeniPredmetIspitnaComponent } from './zaposleni-meni-predmet-ispitna.component';

describe('ZaposleniMeniPredmetIspitnaComponent', () => {
  let component: ZaposleniMeniPredmetIspitnaComponent;
  let fixture: ComponentFixture<ZaposleniMeniPredmetIspitnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniMeniPredmetIspitnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniMeniPredmetIspitnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
