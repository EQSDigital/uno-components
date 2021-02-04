import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { BadgeComponent } from './badge.component';

@NgModule({
    imports: [CommonModule],
    exports: [BadgeComponent],
    declarations: [BadgeComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoBadgeModule { }
