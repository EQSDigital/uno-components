import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { DragDropFileComponent } from './drag-drop-file.component';
import { DragAndDropFileDirective } from './drag-and-drop-files.directive';
import { UnoIconModule } from '../icon/icon.module';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        UnoIconModule
    ],
    exports: [DragDropFileComponent, DragAndDropFileDirective],
    declarations: [DragDropFileComponent, DragAndDropFileDirective],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoDragDropFileModule { }
