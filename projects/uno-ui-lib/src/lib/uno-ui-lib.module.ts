import { NgModule } from '@angular/core';

import { UnoAssetVisualizerModule } from './asset-visualizer/asset-visualizer.module';
import { UnoBadgeModule } from './badge/badge.module';
import { UnoButtonModule } from './button/button.module';
import { UnoCircleGraphModule } from './circle-graph/circle-graph.module';
import { UnoColorPicklistModule } from './color-pick/color-picklist.module';
import { UnoControlErrorModule } from './control-error/control-error.module';
import { UnoDateDayModule } from './date-day/date-day.module';
import { UnoDateWeekdaysModule } from './date-weekdays/date-weekdays.module';
import { UnoDateYearModule } from './date-year/date-year.module';
import { UnoDatepickerModule } from './datepicker/datepicker.module';
import { UnoDatepicker2Module } from './datepicker2/datepicker2.module';
import { UnoDragDropFileModule } from './drag-drop-file/drag-drop-file.module';
import { UnoDropdownModule } from './dropdown/dropdown.module';
import { UnoIconModule } from './icon/icon.module';
import { UnoImageCropperModule } from './image-cropper/image-cropper.module';
import { UnoInputTagsModule } from './input-tags/input-tags.module';
import { UnoLookupModule } from './lookup/lookup.module';
import { UnoModalModule } from './modal/modal.module';
import { UnoPaginationModule } from './pagination/pagination.module';
import { UnoPickModule } from './pick/pick.module';
import { UnoPicklistModule } from './picklist/picklist.module';
import { UnoPictureModule } from './picture/picture.module';
import { UnoPillModule } from './pill/pill.module';
import { UnoPopoverModule } from './popover/popover.module';
import { UnoScrollTrackerModule } from './scroll-tracker/scroll-tracker.module';
import { UnoSearchModule } from './search/search.module';
import { UnoSwitchModule } from './switch/switch.module';
import { UnoTableModule } from './table/table.module';
import { UnoTabsModule } from './tabs/tabs.module';
import { UnoDragDropImageModule } from './drag-drop-image/drag-drop-image.module';
import { UnoToastModule } from './toast/toast.module';

const MODULES = [
    UnoAssetVisualizerModule,
    UnoBadgeModule,
    UnoButtonModule,
    UnoCircleGraphModule,
    UnoColorPicklistModule,
    UnoControlErrorModule,
    UnoDateDayModule,
    UnoDateWeekdaysModule,
    UnoDateYearModule,
    UnoDatepickerModule,
    UnoDatepicker2Module,
    UnoDragDropFileModule,
    UnoDropdownModule,
    UnoIconModule,
    UnoImageCropperModule,
    UnoInputTagsModule,
    UnoLookupModule,
    UnoModalModule,
    UnoPaginationModule,
    UnoPickModule,
    UnoPicklistModule,
    UnoPictureModule,
    UnoPillModule,
    UnoPopoverModule,
    UnoScrollTrackerModule,
    UnoSearchModule,
    UnoSwitchModule,
    UnoTableModule,
    UnoTabsModule,
    UnoDragDropImageModule,
    UnoToastModule
];

@NgModule({
    exports: [
        MODULES
    ]
})
export class UnoUiLibModule { }
