import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { UnoDropdownModule } from '../dropdown/dropdown.module';

import { DateYearComponent } from './date-year.component';

@NgModule({
    imports: [CommonModule, UnoDropdownModule],
    exports: [DateYearComponent],
    declarations: [DateYearComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoDateYearModule { }
