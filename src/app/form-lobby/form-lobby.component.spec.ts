import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLobbyComponent } from './form-lobby.component';

describe('FormLobbyComponent', () => {
  let component: FormLobbyComponent;
  let fixture: ComponentFixture<FormLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLobbyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
