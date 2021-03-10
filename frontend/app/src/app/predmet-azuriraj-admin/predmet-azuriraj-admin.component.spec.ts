import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetAzurirajAdminComponent } from './predmet-azuriraj-admin.component';

describe('PredmetAzurirajAdminComponent', () => {
  let component: PredmetAzurirajAdminComponent;
  let fixture: ComponentFixture<PredmetAzurirajAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetAzurirajAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetAzurirajAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
