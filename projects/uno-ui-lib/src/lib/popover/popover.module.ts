import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { PopoverComponent } from './popover.component';
import { PopoverTriggerDirective } from './popover-trigger.directive';
import { PopoverBehaviorDirective } from './popover-behavior.directive';
import { PopoverClickBehaviorDirective } from './popover-click-behavior.directive';
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
