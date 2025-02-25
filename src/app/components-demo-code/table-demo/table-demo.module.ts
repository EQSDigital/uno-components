import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableDemoComponent } from './table-demo.component';
import { ComponentLayoutModule } from './../../component-layout/component-layout.module';
import { EditorLinkComponent } from './editor-cell-link';
import { RenderUsernameComponent } from './render-cell-username';
import { RenderPickColumnComponent } from './render-pick-cell';
import { BasicComponent } from './examples/basic.component';

const routes: Routes = [
    { path: '', component: TableDemoComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ComponentLayoutModule,
        TableDemoComponent,
        EditorLinkComponent,
        RenderUsernameComponent,
        RenderPickColumnComponent,
        BasicComponent
    ],
    exports: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableDemoModule { }
