import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtvoriSpisakComponent } from './otvori-spisak.component';

describe('OtvoriSpisakComponent', () => {
  let component: OtvoriSpisakComponent;
  let fixture: ComponentFixture<OtvoriSpisakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtvoriSpisakComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtvoriSpisakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
