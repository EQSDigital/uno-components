import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { PillComponent } from './pill.component';
import { PillRemoveDirective } from './pill-remove.directive';
import { PillLinkDirective } from './pill-link.directive';
import { PillImageDirective } from './pill-image.directive';
import { UnoIconModule } from '../icon/icon.module';

@NgModule({
    imports: [CommonModule, UnoIconModule],
    exports: [PillComponent, PillRemoveDirective, PillLinkDirective, PillImageDirective],
    declarations: [PillComponent, PillRemoveDirective, PillLinkDirective, PillImageDirective],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoPillModule { }
