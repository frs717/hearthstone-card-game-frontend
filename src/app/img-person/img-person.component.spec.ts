import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPersonComponent } from './img-person.component';

describe('ImgPersonComponent', () => {
  let component: ImgPersonComponent;
  let fixture: ComponentFixture<ImgPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
