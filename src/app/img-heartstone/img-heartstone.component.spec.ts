import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgHeartstoneComponent } from './img-heartstone.component';

describe('ImgHeartstoneComponent', () => {
  let component: ImgHeartstoneComponent;
  let fixture: ComponentFixture<ImgHeartstoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgHeartstoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgHeartstoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
