import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { ComponentLayoutComponent } from './component-layout.component';

@NgModule({
    imports: [
        CommonModule,
        MarkdownModule.forChild(),
        ComponentLayoutComponent
    ],
    exports: [ComponentLayoutComponent],
    providers: [],
})
export class ComponentLayoutModule { }
