import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFinishedComponent } from './form-finished.component';

describe('FormFinishedComponent', () => {
  let component: FormFinishedComponent;
  let fixture: ComponentFixture<FormFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFinishedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
