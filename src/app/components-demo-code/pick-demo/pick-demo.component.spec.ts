import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickDemoComponent } from './pick-demo.component';

describe('PickDemoComponent', () => {
  let component: PickDemoComponent;
  let fixture: ComponentFixture<PickDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
