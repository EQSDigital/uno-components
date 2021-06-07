import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StringTemplateRefTransformComponent } from '../../utils/common-directives/string-templateRef-transform';
import { UnoIconModule } from '../icon/icon.module';
import { UnoPillModule } from '../pill/pill.module';
import { UnoScrollTrackerModule } from '../scroll-tracker/scroll-tracker.module';

import { LookupComponent, LookupItemDirective, LookupLabelDirective, LookupHeaderDirective } from './lookup.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UnoPillModule,
        UnoIconModule,
        UnoScrollTrackerModule
    ],
    exports: [LookupComponent, LookupItemDirective, LookupLabelDirective, LookupHeaderDirective],
    declarations: [LookupComponent, LookupItemDirective, LookupLabelDirective, LookupHeaderDirective, StringTemplateRefTransformComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoLookupModule { }
