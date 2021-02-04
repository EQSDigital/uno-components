import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PicklistComponent } from './picklist.component';
import { PickItemDirective } from './pick-item.directive';
import { UnoDropdownModule } from '../dropdown/dropdown.module';
import { UnoScrollTrackerModule } from '../scroll-tracker/scroll-tracker.module';
import { UnoIconModule } from '../icon/icon.module';
import { UnoPickModule } from '../pick/pick.module';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        UnoDropdownModule,
        UnoScrollTrackerModule,
        UnoIconModule,
        UnoPickModule
    ],
    exports: [PicklistComponent, PickItemDirective],
    declarations: [PicklistComponent, PickItemDirective],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoPicklistModule { }
