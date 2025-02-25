import { Component } from '@angular/core';
import { BasicComponent } from './examples/basic.component';
import { ComponentLayoutComponent } from '../../component-layout/component-layout.component';

@Component({
    selector: 'app-table-demo-collapsible',
    templateUrl: './table-demo-collapsible.component.html',
    standalone: true,
    imports: [ComponentLayoutComponent, BasicComponent]
})
export class TableDemoCollapsibleComponent { }
