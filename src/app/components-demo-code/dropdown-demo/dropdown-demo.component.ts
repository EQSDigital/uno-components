import { Component } from '@angular/core';
import { BasicComponent } from './examples/basic.component';
import { ComponentLayoutComponent } from '../../component-layout/component-layout.component';

@Component({
    selector: 'app-dropdown-demo',
    templateUrl: './dropdown-demo.component.html',
    styleUrls: ['./dropdown-demo.component.css'],
    standalone: true,
    imports: [ComponentLayoutComponent, BasicComponent]
})
export class DropdownDemoComponent { }
