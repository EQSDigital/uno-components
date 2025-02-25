import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableDemoNanoComponent } from './table-demo-nano.component';
import { ComponentLayoutModule } from '../../component-layout/component-layout.module';
import { NanoService } from './nano-http.service';
import { BasicComponent } from './examples/basic.component';

const routes: Routes = [
    { path: '', component: TableDemoNanoComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ComponentLayoutModule,
        TableDemoNanoComponent,
        BasicComponent
    ],
    exports: [],
    providers: [
        NanoService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableNanoModule { }
