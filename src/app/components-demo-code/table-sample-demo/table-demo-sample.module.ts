import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableDemoSampleComponent } from './table-demo-sample.component';
import { ComponentLayoutModule } from '../../component-layout/component-layout.module';
import { BasicComponent } from './examples/basic.component';

const routes: Routes = [
    { path: '', component: TableDemoSampleComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ComponentLayoutModule,
        TableDemoSampleComponent,
        BasicComponent
    ],
    exports: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableDemoSampleModule { }
