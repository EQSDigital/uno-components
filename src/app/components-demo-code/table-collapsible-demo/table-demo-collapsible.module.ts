import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnoUiLibModule } from 'uno-ui-lib';

import { TableDemoCollapsibleComponent } from './table-demo-collapsible.component';
import { ComponentLayoutModule } from './../../component-layout/component-layout.module';
import { RenderBadgeComponent } from './render-badge';
import { RenderBadgesComponent } from './render-badges';
import { RenderInputTagsComponent } from './render-input-tags';
import { BasicComponent } from './examples/basic.component';

const routes: Routes = [
    { path: '', component: TableDemoCollapsibleComponent },
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
        TableDemoCollapsibleComponent,
        RenderBadgeComponent,
        RenderBadgesComponent,
        RenderInputTagsComponent,
        BasicComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableDemoCollapsibleModule { }
