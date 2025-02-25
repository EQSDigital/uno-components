import { Component } from '@angular/core';
import { BasicComponent } from './examples/basic.component';
import { ComponentLayoutComponent } from '../../component-layout/component-layout.component';

@Component({
    selector: 'app-picklist-demo',
    templateUrl: './picklist-demo.component.html',
    standalone: true,
    imports: [ComponentLayoutComponent, BasicComponent]
})
export class PicklistDemoComponent {}
