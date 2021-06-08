import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from './header.component';

import { UnoIconModule } from '../../../icon/icon.module';
import { UnoSearchModule } from '../../../search/search.module';
import { UnoButtonModule } from '../../../button/button.module';
import { UnoPopoverModule } from '../../../popover/popover.module';


@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        UnoIconModule,
        UnoSearchModule,
        UnoButtonModule,
        UnoPopoverModule
    ],
    declarations: [
        HeaderComponent
    ],
    exports: [
        HeaderComponent
    ],
})
export class HeaderModule { }
