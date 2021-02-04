import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateYearComponent } from './date-year.component';

describe('DateYearComponent', () => {
  let component: DateYearComponent;
  let fixture: ComponentFixture<DateYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateYearComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
