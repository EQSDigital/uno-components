import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UnoIconModule } from '../icon/icon.module';

import { PaginationComponent } from './pagination.component';

@NgModule({
    imports: [CommonModule, TranslateModule, UnoIconModule],
    exports: [PaginationComponent],
    declarations: [PaginationComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoPaginationModule { }
