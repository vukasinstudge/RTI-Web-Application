import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpisakDetaljiComponent } from './spisak-detalji.component';

describe('SpisakDetaljiComponent', () => {
  let component: SpisakDetaljiComponent;
  let fixture: ComponentFixture<SpisakDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpisakDetaljiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpisakDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
