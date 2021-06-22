import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalComponent } from './modal.component';
import { ModalHeaderDirective } from './header.directive';
import { ModalFooterDirective } from './footer.directive';
import { DragAndDropFileDirective } from '../drag-drop-file/drag-and-drop-files.directive';
import { UnoButtonModule } from '../button/button.module';
import { UnoIconModule } from '../icon/icon.module';
import { UnoDatepicker2Module } from '../datepicker2/datepicker2.module';
import { UnoDropdownModule } from '../dropdown/dropdown.module';
import { UnoControlErrorModule } from '../control-error/control-error.module';
import { UnoPicklistModule } from '../picklist/picklist.module';
import { UnoPickModule } from '../pick/pick.module';
import { UnoDragDropFileModule } from '../drag-drop-file/drag-drop-file.module';

@NgModule({
    imports: [
        CommonModule,
        A11yModule,
        OverlayModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        UnoButtonModule,
        UnoIconModule,
        UnoDatepicker2Module,
        UnoDropdownModule,
        UnoControlErrorModule,
        UnoPicklistModule,
        UnoPickModule,
        UnoDragDropFileModule
    ],
    exports: [ModalComponent, ModalHeaderDirective, ModalFooterDirective],
    declarations: [ModalComponent, ModalHeaderDirective, ModalFooterDirective],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoModalModule { }
