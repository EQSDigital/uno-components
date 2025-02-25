import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicklistDemoComponent } from './picklist-demo.component';

describe('PicklistDemoComponent', () => {
  let component: PicklistDemoComponent;
  let fixture: ComponentFixture<PicklistDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [PicklistDemoComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicklistDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
