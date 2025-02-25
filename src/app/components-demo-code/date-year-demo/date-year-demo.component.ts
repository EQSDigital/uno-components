import { Component } from '@angular/core';
import { BasicComponent } from './examples/basic.component';
import { ComponentLayoutComponent } from '../../component-layout/component-layout.component';

@Component({
    selector: 'app-date-year-demo',
    templateUrl: './date-year-demo.component.html',
    styleUrls: ['./date-year-demo.component.css'],
    standalone: true,
    imports: [ComponentLayoutComponent, BasicComponent]
})
export class DateYearDemoComponent { }
