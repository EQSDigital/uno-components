import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComponentLayoutModule } from '../../component-layout/component-layout.module';
import { TabsDemoComponent } from './tabs-demo.component';
import { BasicComponent } from './examples/basic.component';

const routes: Routes = [
    { path: '', component: TabsDemoComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ComponentLayoutModule,
        TabsDemoComponent,
        BasicComponent
    ],
    exports: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabsDemoModule { }
