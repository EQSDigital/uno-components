import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComponentLayoutModule } from '../../component-layout/component-layout.module';
import { Datepicker2DemoComponent } from './datepicker2-demo.component';
import { BasicComponent } from './examples/basic.component';

const routes: Routes = [
    { path: '', component: Datepicker2DemoComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ComponentLayoutModule,
        Datepicker2DemoComponent,
        BasicComponent
    ],
    exports: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Datepicker2DemoModule { }
