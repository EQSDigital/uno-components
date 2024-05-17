import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnoUiLibModule } from 'uno-ui-lib';

import { ComponentLayoutModule } from '../../component-layout/component-layout.module';
import { BasicComponent } from './examples/basic.component';
import { BannerDemoComponent } from './banner-demo.component';

const routes: Routes = [
    { path: '', component: BannerDemoComponent }
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
        BannerDemoComponent,
        BasicComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BannerDemoModule { }
