import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniMeniComponent } from './zaposleni-meni.component';

describe('ZaposleniMeniComponent', () => {
  let component: ZaposleniMeniComponent;
  let fixture: ComponentFixture<ZaposleniMeniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniMeniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniMeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
