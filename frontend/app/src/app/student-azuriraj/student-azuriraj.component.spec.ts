import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAzurirajComponent } from './student-azuriraj.component';

describe('StudentAzurirajComponent', () => {
  let component: StudentAzurirajComponent;
  let fixture: ComponentFixture<StudentAzurirajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAzurirajComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAzurirajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
