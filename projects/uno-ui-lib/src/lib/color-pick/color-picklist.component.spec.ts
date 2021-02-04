import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPicklistComponent } from './color-picklist.component';

describe('ColorPicklistComponent', () => {
  let component: ColorPicklistComponent;
  let fixture: ComponentFixture<ColorPicklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorPicklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPicklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
