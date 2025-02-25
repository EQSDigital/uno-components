import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateYearDemoComponent } from './date-year-demo.component';

describe('DateYearDemoComponent', () => {
  let component: DateYearDemoComponent;
  let fixture: ComponentFixture<DateYearDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [DateYearDemoComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateYearDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
