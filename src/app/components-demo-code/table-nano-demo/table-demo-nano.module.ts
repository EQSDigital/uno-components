import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnoUiLibModule } from 'uno-ui-lib';

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
        UnoUiLibModule,
        ComponentLayoutModule
    ],
    exports: [],
    declarations: [
        TableDemoNanoComponent,
        BasicComponent
    ],
    providers: [
        NanoService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableNanoModule { }
