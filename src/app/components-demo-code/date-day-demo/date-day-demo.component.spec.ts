import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateDayDemoComponent } from './date-day-demo.component';

describe('DateDayDemoComponent', () => {
  let component: DateDayDemoComponent;
  let fixture: ComponentFixture<DateDayDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [DateDayDemoComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateDayDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
