import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { DropdownDirective } from './dropdown.directive';
import { DropdownItemDirective } from './dropdown-item.directive';
import { DropdownTriggerDirective } from './dropdown-trigger.directive';

@NgModule({
    imports: [CommonModule],
    exports: [DropdownDirective, DropdownItemDirective, DropdownTriggerDirective],
    declarations: [DropdownDirective, DropdownItemDirective, DropdownTriggerDirective],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoDropdownModule { }
