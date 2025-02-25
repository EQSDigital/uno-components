import { Component } from '@angular/core';
import { BasicComponent } from './examples/basic.component';
import { ComponentLayoutComponent } from '../../component-layout/component-layout.component';

@Component({
    selector: 'app-date-weekdays-demo',
    templateUrl: './date-weekdays-demo.component.html',
    standalone: true,
    imports: [ComponentLayoutComponent, BasicComponent]
})
export class DateWeekdaysDemoComponent { }
