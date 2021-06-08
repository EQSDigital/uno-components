import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { TableComponent } from './table.component';
import { DefaultEditorDirective } from './index';
import { CellModule } from './components/cell/cell.module';
import { TBodyModule } from './components/tbody/tbody.module';
import { THeadModule } from './components/thead/thead.module';
import { HeaderModule } from './components/header/header.module';

import { TbodyCollapseContentDirective } from './components/tbody/tbody-collapse-content.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CellModule,
        TBodyModule,
        THeadModule,
        TranslateModule,
        HeaderModule
    ],
    exports: [
        TableComponent,
        DefaultEditorDirective,
        CellModule,
        TbodyCollapseContentDirective
    ],
    declarations: [
        TableComponent,
        DefaultEditorDirective,
        TbodyCollapseContentDirective
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoTableModule { }
