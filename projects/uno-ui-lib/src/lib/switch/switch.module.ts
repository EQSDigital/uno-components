import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SwitchComponent } from './switch.component';

@NgModule({
    imports: [CommonModule],
    exports: [SwitchComponent],
    declarations: [SwitchComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoSwitchModule { }
