import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetVisualizerDemoComponent } from './asset-visualizer-demo.component';

describe('AsetVisualizerDemoComponent', () => {
  let component: AssetVisualizerDemoComponent;
  let fixture: ComponentFixture<AssetVisualizerDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [AssetVisualizerDemoComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetVisualizerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
