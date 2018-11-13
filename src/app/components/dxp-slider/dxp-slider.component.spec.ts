import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DxpSliderComponent } from './dxp-slider.component';

describe('DxpSliderComponent', () => {
  let component: DxpSliderComponent;
  let fixture: ComponentFixture<DxpSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DxpSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DxpSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
