import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollTrackerDirective } from './scroll-tracker.directive';

describe('ScrollTrackerDirective', () => {
    let component: ScrollTrackerDirective;
    let fixture: ComponentFixture<ScrollTrackerDirective>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScrollTrackerDirective]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScrollTrackerDirective);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
