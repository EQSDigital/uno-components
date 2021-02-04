import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { IconComponent } from './icon.component';

@NgModule({
    imports: [CommonModule],
    exports: [IconComponent],
    declarations: [IconComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoIconModule { }
