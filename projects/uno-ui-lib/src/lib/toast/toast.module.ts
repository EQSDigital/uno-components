import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UnoIconModule } from '../icon/icon.module';

import { ToastComponent } from './toast.component';

import { ToastDescriptionDirective } from './toast-description.directive';

@NgModule({
    imports: [CommonModule, TranslateModule, UnoIconModule],
    exports: [ToastComponent, ToastDescriptionDirective],
    declarations: [ToastComponent, ToastDescriptionDirective],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoToastModule { }