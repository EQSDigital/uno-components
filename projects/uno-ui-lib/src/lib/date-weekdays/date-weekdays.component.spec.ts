import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateWeekdaysComponent } from './date-weekdays.component';

describe('DateWeekdaysComponent', () => {
  let component: DateWeekdaysComponent;
  let fixture: ComponentFixture<DateWeekdaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateWeekdaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateWeekdaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
