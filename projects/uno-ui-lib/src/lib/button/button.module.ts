import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ButtonDirective } from './button.directive';

@NgModule({
    imports: [CommonModule],
    exports: [ButtonDirective],
    declarations: [ButtonDirective],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoButtonModule { }
