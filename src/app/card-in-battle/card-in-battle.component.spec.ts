import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInBattleComponent } from './card-in-battle.component';

describe('CardInBattleComponent', () => {
  let component: CardInBattleComponent;
  let fixture: ComponentFixture<CardInBattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardInBattleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
