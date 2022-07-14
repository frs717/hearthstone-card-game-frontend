import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InBattleComponent } from './in-battle.component';

describe('InBattleComponent', () => {
  let component: InBattleComponent;
  let fixture: ComponentFixture<InBattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InBattleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
