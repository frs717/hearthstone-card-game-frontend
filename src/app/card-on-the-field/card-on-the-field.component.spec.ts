import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOnTheFieldComponent } from './card-on-the-field.component';

describe('CardOnTheFieldComponent', () => {
  let component: CardOnTheFieldComponent;
  let fixture: ComponentFixture<CardOnTheFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardOnTheFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardOnTheFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
