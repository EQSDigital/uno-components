import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ControlErrorComponent } from './control-error.component';
import { ControlErrorDirective } from './control-error.directive';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { UnoIconModule } from './../icon/icon.module';

@NgModule({
    imports: [CommonModule, UnoIconModule],
    exports: [ControlErrorComponent, ControlErrorDirective, ControlErrorContainerDirective],
    declarations: [ControlErrorComponent, ControlErrorDirective, ControlErrorContainerDirective],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoControlErrorModule { }
