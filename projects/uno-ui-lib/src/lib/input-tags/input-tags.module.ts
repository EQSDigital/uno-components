import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { UnoIconModule } from '../icon/icon.module';
import { UnoPillModule } from '../pill/pill.module';

import { InputTagsComponent } from './input-tags.component';

@NgModule({
    imports: [CommonModule, UnoIconModule, UnoPillModule],
    exports: [InputTagsComponent],
    declarations: [InputTagsComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoInputTagsModule { }
