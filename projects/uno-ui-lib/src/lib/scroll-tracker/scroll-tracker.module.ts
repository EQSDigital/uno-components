import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ScrollTrackerDirective } from './scroll-tracker.directive';

@NgModule({
    imports: [CommonModule],
    exports: [ScrollTrackerDirective],
    declarations: [ScrollTrackerDirective],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoScrollTrackerModule { }
