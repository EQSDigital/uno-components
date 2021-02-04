import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UnoBadgeModule } from '../badge/badge.module';
import { UnoButtonModule } from '../button/button.module';
import { UnoDateDayModule } from '../date-day/date-day.module';
import { UnoDateWeekdaysModule } from '../date-weekdays/date-weekdays.module';
import { UnoDateYearModule } from '../date-year/date-year.module';
import { UnoIconModule } from '../icon/icon.module';

import { DatepickerComponent } from './datepicker.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        UnoBadgeModule,
        UnoIconModule,
        UnoDateYearModule,
        UnoButtonModule,
        UnoDateWeekdaysModule,
        UnoDateDayModule
    ],
    exports: [DatepickerComponent],
    declarations: [DatepickerComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoDatepickerModule { }
