import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { PopoverComponent, PopoverTriggerDirective, PopoverBehaviorDirective, PopoverClickBehaviorDirective } from './popover.component';
import { UnoIconModule } from '../icon/icon.module';
import { UnoDatepickerModule } from '../datepicker/datepicker.module';

@NgModule({
    imports: [CommonModule, TranslateModule, UnoIconModule, UnoDatepickerModule],
    exports: [PopoverComponent, PopoverTriggerDirective, PopoverBehaviorDirective, PopoverClickBehaviorDirective],
    declarations: [PopoverComponent, PopoverTriggerDirective, PopoverBehaviorDirective, PopoverClickBehaviorDirective],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoPopoverModule { }
