import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ColorPicklistComponent } from './color-picklist.component';
import { ColorPickItemDirective } from './color-picklist-item.directive';
import { UnoButtonModule } from '../button/button.module';
import { UnoPopoverModule } from '../popover/popover.module';
import { UnoPickModule } from '../pick/pick.module';
import { UnoIconModule } from '../icon/icon.module';

@NgModule({
    imports: [
        CommonModule,
        UnoButtonModule,
        UnoPopoverModule,
        UnoPickModule,
        UnoIconModule
    ],
    exports: [ColorPicklistComponent],
    declarations: [ColorPicklistComponent, ColorPickItemDirective],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoColorPicklistModule { }
