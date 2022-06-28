import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { CellModule } from '../cell/cell.module';
import { Ng2SmartTableTheadComponent } from './thead.component';
import { THeadCreateCancelComponent } from './cells/create-cancel.component';
import { ActionsTitleComponent } from './cells/actions-title.component';
import { CheckboxSelectAllComponent } from './cells/checkbox-select-all.component';
import { ColumnTitleComponent } from './cells/column-title.component';
import { TheadFormRowComponent } from './rows/thead-form-row.component';
import { TheadTitlesRowComponent } from './rows/thead-titles-row.component';
import { DefaultEditorDirective } from '../../lib/editor-cell-default';

import { UnoIconModule } from '../../../icon/icon.module';
import { UnoButtonModule } from '../../../button/button.module';
import { UnoPopoverModule } from '../../../popover/popover.module';

const THEAD_COMPONENTS = [
    THeadCreateCancelComponent,
    ActionsTitleComponent,
    CheckboxSelectAllComponent,
    ColumnTitleComponent,
    TheadFormRowComponent,
    TheadTitlesRowComponent,
    Ng2SmartTableTheadComponent,
    DefaultEditorDirective
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CellModule,
        TranslateModule,
        UnoIconModule,
        UnoButtonModule,
        UnoPopoverModule
    ],
    declarations: [
        ...THEAD_COMPONENTS,
    ],
    exports: [
        ...THEAD_COMPONENTS,
    ],
})
export class THeadModule { }
