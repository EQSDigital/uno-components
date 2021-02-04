import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { TabsComponent } from './tabs.component';
import { TabDirective } from './tab.directive';
import { TabHeadingDetailDirective, TabHeadingDirective, TabContentDirective } from './tab-heading-detail.directive';

@NgModule({
    imports: [CommonModule, TranslateModule],
    exports: [TabsComponent, TabDirective, TabHeadingDirective, TabHeadingDetailDirective, TabContentDirective],
    declarations: [TabsComponent, TabDirective, TabHeadingDirective, TabHeadingDetailDirective, TabContentDirective],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoTabsModule { }
