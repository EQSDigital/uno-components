import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { TableDemoRiskTemplateComponent } from './table-demo-risk-template.component';
import { ComponentLayoutModule } from '../../component-layout/component-layout.module';
import { RenderDuskBadgeColumnComponent } from './badge.renderDuskBadgeColumn';
import { RenderCommentsColumnComponent } from './comments.renderCommentsColumn';
import { RenderLikelihoodColumnComponent } from './likelihood.renderLikelihoodColumn';
import { RenderControlLevelColumnComponent } from './controlLevel.renderControlLevelColumn';
import { BasicComponent } from './examples/basic.component';

const routes: Routes = [
    { path: '', component: TableDemoRiskTemplateComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule,
        ComponentLayoutModule,
        TableDemoRiskTemplateComponent,
        RenderDuskBadgeColumnComponent,
        RenderCommentsColumnComponent,
        RenderLikelihoodColumnComponent,
        RenderControlLevelColumnComponent,
        BasicComponent
    ],
    exports: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableDemoRiskTemplateModule { }
