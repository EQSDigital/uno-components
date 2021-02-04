import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Datepicker2Component } from './datepicker2.component';

describe('Datepicker2Component', () => {
    let component: Datepicker2Component;
    let fixture: ComponentFixture<Datepicker2Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Datepicker2Component]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Datepicker2Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
