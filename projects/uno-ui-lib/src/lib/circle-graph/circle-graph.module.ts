import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { CircleGraphComponent } from './circle-graph.component';

@NgModule({
    imports: [CommonModule, TranslateModule],
    exports: [CircleGraphComponent],
    declarations: [CircleGraphComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoCircleGraphModule { }
