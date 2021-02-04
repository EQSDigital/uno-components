import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { UnoUiLibModule } from 'uno-ui-lib';

import { ComponentLayoutComponent } from './component-layout.component';

@NgModule({
    imports: [
        CommonModule,
        MarkdownModule.forChild(),
        UnoUiLibModule
    ],
    exports: [ComponentLayoutComponent],
    declarations: [ComponentLayoutComponent],
    providers: [],
})
export class ComponentLayoutModule { }
