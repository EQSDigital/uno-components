import { Component } from '@angular/core';
import { BasicComponent } from './examples/basic.component';
import { ComponentLayoutComponent } from '../../component-layout/component-layout.component';

@Component({
    selector: 'app-datepicker2-demo',
    templateUrl: './datepicker2-demo.component.html',
    standalone: true,
    imports: [ComponentLayoutComponent, BasicComponent]
})

export class Datepicker2DemoComponent { }
