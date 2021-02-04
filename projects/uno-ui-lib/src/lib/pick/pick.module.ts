import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { PickDirective } from './pick.directive';
import { PickOptionDirective } from './pick-option.directive';

@NgModule({
    imports: [CommonModule],
    exports: [PickDirective, PickOptionDirective],
    declarations: [PickDirective, PickOptionDirective],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoPickModule { }
