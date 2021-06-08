import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDemoCollapsibleComponent } from './table-demo-collapsible.component';

describe('TableDemoCollapsibleComponent', () => {
  let component: TableDemoCollapsibleComponent;
  let fixture: ComponentFixture<TableDemoCollapsibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDemoCollapsibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDemoCollapsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
