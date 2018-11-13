import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DxpDropdownComponent } from './dxp-dropdown.component';

describe('DxpDropdownComponent', () => {
  let component: DxpDropdownComponent;
  let fixture: ComponentFixture<DxpDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DxpDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DxpDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
