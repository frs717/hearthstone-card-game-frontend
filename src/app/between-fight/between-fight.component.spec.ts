import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenFightComponent } from './between-fight.component';

describe('BetweenFightComponent', () => {
  let component: BetweenFightComponent;
  let fixture: ComponentFixture<BetweenFightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetweenFightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetweenFightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
