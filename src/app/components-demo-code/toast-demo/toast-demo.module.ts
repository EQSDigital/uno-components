import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComponentLayoutModule } from '../../component-layout/component-layout.module';
import { BasicComponent } from './examples/basic.component';
import { ToastDemoComponent } from './toast-demo.component';

const routes: Routes = [
    { path: '', component: ToastDemoComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ComponentLayoutModule,
        ToastDemoComponent,
        BasicComponent
    ],
    exports: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToastDemoModule { }
