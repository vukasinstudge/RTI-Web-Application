import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaSlikeComponent } from './promena-slike.component';

describe('PromenaSlikeComponent', () => {
  let component: PromenaSlikeComponent;
  let fixture: ComponentFixture<PromenaSlikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromenaSlikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromenaSlikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
