import { Component, ViewChild } from '@angular/core';
import { ImageCropperComponent, ImageCroppedEvent } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
})

export class BasicComponent {
    imageChangedEvent: any = '';
    croppedImage: any = '';
    showCropper = false;

    @ViewChild(ImageCropperComponent, { static: true }) imageCropper: ImageCropperComponent;

    /**
     *  Once user chooses an Img, its props are coming into "event" param
     * (HTML5's type="file" (change) event)
     *
     * @param event
     */
    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }

    /**
     * Received data form the UNO ui-lib component
     *
     * @param event
     */
    imageLoaded() {
        this.showCropper = true;
        console.log('Image loaded');
    }

    startCropImage() {
        console.log('Cropper has started');
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        console.log('Image is now 1st cropped: ', event);
    }

    cropperReady() {
        console.log('Cropper ready to be used');
    }

    loadImageFailed() {
        console.log('Load failed');
    }
}
