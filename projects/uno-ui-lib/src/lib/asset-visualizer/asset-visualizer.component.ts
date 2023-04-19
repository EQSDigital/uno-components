import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'uno-asset-visualizer',
    templateUrl: './asset-visualizer.component.html',
    styleUrls: ['./asset-visualizer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetVisualizerComponent {
    /**
     * Define the default image, when no image set yet.
     */
    @Input() defaultAssetImgURL: string;

    /**
     * Define the image to show.
     */
    @Input() imgURL: string;

    /**
     * Define if user can edit image.
     */
    @Input() showEditImage = true;

    /**
     * Define if user can upload image.
     */
    @Input() showUploadImage = true;

    /**
     * Define if user can remove image.
     */
    @Input() showRemoveImage = true;

    /**
     * Define if user only can see the image.
     */
    @Input() onlyViewImage = false;

    @Output() imageUploaded = new EventEmitter();
    @Output() imageDeleted = new EventEmitter();

    @Output() sendAssetInfo = new EventEmitter();
    @Output() goToMonitorLink = new EventEmitter();
}
