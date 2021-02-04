import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickComponent } from './pick.component';

describe('PickComponent', () => {
    let component: PickComponent;
    let fixture: ComponentFixture<PickComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PickComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PickComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
