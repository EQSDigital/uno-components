import { Component } from '@angular/core';
import { BasicComponent } from './examples/basic.component';
import { ComponentLayoutComponent } from '../../component-layout/component-layout.component';

@Component({
    selector: 'app-table-demo-risk-template',
    templateUrl: './table-demo-risk-template.component.html',
    standalone: true,
    imports: [ComponentLayoutComponent, BasicComponent]
})
export class TableDemoRiskTemplateComponent { }
