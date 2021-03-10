import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetIspitnaComponent } from './predmet-ispitna.component';

describe('PredmetIspitnaComponent', () => {
  let component: PredmetIspitnaComponent;
  let fixture: ComponentFixture<PredmetIspitnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetIspitnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetIspitnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
