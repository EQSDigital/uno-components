import { Component } from '@angular/core';
import { BasicComponent } from './examples/basic.component';
import { ComponentLayoutComponent } from '../../component-layout/component-layout.component';

@Component({
    selector: 'app-table-demo-nano',
    templateUrl: './table-demo-nano.component.html',
    standalone: true,
    imports: [ComponentLayoutComponent, BasicComponent]
})
export class TableDemoNanoComponent { }
