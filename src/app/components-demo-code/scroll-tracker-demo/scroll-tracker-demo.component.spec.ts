import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollTrackerDemoComponent } from './scroll-tracker-demo.component';

describe('ScrollTrackerDemoComponent', () => {
    let component: ScrollTrackerDemoComponent;
    let fixture: ComponentFixture<ScrollTrackerDemoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
    imports: [ScrollTrackerDemoComponent]
})
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScrollTrackerDemoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
