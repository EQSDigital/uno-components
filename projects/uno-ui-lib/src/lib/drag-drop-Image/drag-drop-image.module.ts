import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { DragDropImageComponent } from './drag-drop-image.component';
import { DragAndDropImageDirective } from './drag-and-drop-image.directive';
import { UnoImageCropperModule } from './../image-cropper/image-cropper.module';
import { UnoModalModule } from '../modal/modal.module';
import { UnoButtonModule } from '../button/button.module';
import { UnoIconModule } from '../icon/icon.module';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        UnoIconModule,
        UnoImageCropperModule,
        UnoModalModule,
        UnoButtonModule
    ],
    exports: [DragDropImageComponent, DragAndDropImageDirective],
    declarations: [DragDropImageComponent, DragAndDropImageDirective],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoDragDropImageModule { }
