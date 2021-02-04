import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UnoIconModule } from '../icon/icon.module';
import { UnoModalModule } from '../modal/modal.module';

import { PictureComponent } from './picture.component';

@NgModule({
    imports: [CommonModule, TranslateModule, UnoIconModule, UnoModalModule],
    exports: [PictureComponent],
    declarations: [PictureComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoPictureModule { }
