import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ImageCropperComponent } from './image-cropper.component';

@NgModule({
    imports: [CommonModule],
    exports: [ImageCropperComponent],
    declarations: [ImageCropperComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoImageCropperModule { }
