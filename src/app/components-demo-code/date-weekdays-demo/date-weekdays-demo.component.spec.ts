import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateWeekdaysDemoComponent } from './date-weekdays-demo.component';

describe('DateWeekdaysDemoComponent', () => {
  let component: DateWeekdaysDemoComponent;
  let fixture: ComponentFixture<DateWeekdaysDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [DateWeekdaysDemoComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateWeekdaysDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
