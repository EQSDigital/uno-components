import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { DateDayComponent } from './date-day.component';

@NgModule({
    imports: [CommonModule],
    exports: [DateDayComponent],
    declarations: [DateDayComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoDateDayModule { }
