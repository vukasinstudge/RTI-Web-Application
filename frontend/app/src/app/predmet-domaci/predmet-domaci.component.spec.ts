import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetDomaciComponent } from './predmet-domaci.component';

describe('PredmetDomaciComponent', () => {
  let component: PredmetDomaciComponent;
  let fixture: ComponentFixture<PredmetDomaciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetDomaciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetDomaciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
