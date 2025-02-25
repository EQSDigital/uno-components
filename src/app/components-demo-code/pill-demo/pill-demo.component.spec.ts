import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PillDemoComponent } from './pill-demo.component';

describe('PillDemoComponent', () => {
  let component: PillDemoComponent;
  let fixture: ComponentFixture<PillDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [PillDemoComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PillDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
