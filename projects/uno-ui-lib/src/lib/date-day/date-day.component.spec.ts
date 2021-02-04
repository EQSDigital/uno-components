import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateDayComponent } from './date-day.component';

describe('DateDayComponent', () => {
  let component: DateDayComponent;
  let fixture: ComponentFixture<DateDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
