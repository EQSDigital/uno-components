import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { CellModule } from '../cell/cell.module';

import { Ng2SmartTableTbodyComponent, TbodyCustomComponent } from './tbody.component';
import { TbodySaveCancelComponent } from './cells/save-cancel.component';
import { TbodyEditDeleteComponent } from './cells/edit-delete.component';
// import { TbodyCustomComponent } from './cells/custom.component';
import { TbodyCollapseContentDirective } from './tbody-collapse-content.directive';

import { UnoIconModule } from '../../../icon/icon.module';
import { UnoButtonModule } from '../../../button/button.module';
import { UnoPopoverModule } from '../../../popover/popover.module';

const TBODY_COMPONENTS = [
    TbodySaveCancelComponent,
    TbodyEditDeleteComponent,
    TbodyCustomComponent,
    Ng2SmartTableTbodyComponent,
    TbodyCollapseContentDirective
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
        ...TBODY_COMPONENTS,
    ],
    exports: [
        ...TBODY_COMPONENTS,
    ],
})
export class TBodyModule { }
