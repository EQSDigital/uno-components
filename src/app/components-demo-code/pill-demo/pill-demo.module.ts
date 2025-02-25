import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComponentLayoutModule } from '../../component-layout/component-layout.module';
import { PillDemoComponent } from './pill-demo.component';
import { BasicComponent } from './examples/basic.component';

const routes: Routes = [
    { path: '', component: PillDemoComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ComponentLayoutModule,
        PillDemoComponent,
        BasicComponent
    ],
    exports: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PillDemoModule { }
