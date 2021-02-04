import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UnoBadgeModule } from '../badge/badge.module';

import { DateWeekdaysComponent } from './date-weekdays.component';

@NgModule({
    imports: [CommonModule, TranslateModule, UnoBadgeModule],
    exports: [DateWeekdaysComponent],
    declarations: [DateWeekdaysComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoDateWeekdaysModule { }
