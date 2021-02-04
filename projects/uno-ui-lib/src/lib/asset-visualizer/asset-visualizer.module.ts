import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { UnoBadgeModule } from '../badge/badge.module';
import { UnoPictureModule } from '../picture/picture.module';
import { UnoIconModule } from '../icon/icon.module';

import { AssetVisualizerComponent } from './asset-visualizer.component';

@NgModule({
    imports: [CommonModule, UnoPictureModule, UnoBadgeModule, UnoIconModule],
    exports: [AssetVisualizerComponent],
    declarations: [AssetVisualizerComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnoAssetVisualizerModule { }
