import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationDemoComponent } from './pagination-demo.component';

describe('PickDemoComponent', () => {
  let component: PaginationDemoComponent;
  let fixture: ComponentFixture<PaginationDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [PaginationDemoComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
