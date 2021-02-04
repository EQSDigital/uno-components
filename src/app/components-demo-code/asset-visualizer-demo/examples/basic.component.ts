import { Component } from '@angular/core';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
})

export class BasicComponent {
    defaultImgURL = 'assets/imgs/asset-visualizer-default-image.png';
    // imgURL: string;
    // Simulate editing a form, showing already an Img coming from DB
    // NOTE:
    // 1) You need to be looged in - get the url, now (tehre's timouts), from any Nano app asset currently being edited form.
    // 2) Keep the code clen: uncomment next line, comment previous
    // If you have "CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource" problems,
    // here is a public one:
    imgURL = 'https://i.imgur.com/fHyEMsl.jpg';

    // Data for the <uno-cropper-image /> to work:
    currentUploadedImage: any = ''; // File;

    // Other optional inputs, that will draw buttons/icons to other URL pages (comment/un-comment for testing)
    hasMonitorLink = true;
    scenes3D_array = [
        { uuid: 'qqq', Url: 'qqqq', AssetObject: 'qqqq', name: '2D' },
        { uuid: 'qqq', Url: 'qqqq', AssetObject: 'qqqq', name: '3D' }
    ];

    constructor() { }

    /**
     * When user presses "Save", at `<uno-cropper-image />` cmponent's edit Modal,
     * an `evt` is trigered with the cropped image (File Blob) event, so "this.currentUploadedImage" can be filled in.
     * The cropped image is, then, showed at this `<uno-asset-visualizer />` component.
     *
     * @param evt
     */
    newImgUploaded(evt) {
        console.warn('User has uploaded a new img @ "this.currentUploadedImage" var:', evt);
        if (evt.name !== null) {
            this.currentUploadedImage = evt;
        } else {
            this.currentUploadedImage = ''; // as File;
        }
    }

    saveImgCropper(img) {
        console.log('User has SAVEd @ crop image\'s Modal', `${img.substring(0, 30)}....${img.substring(img.length - 10)}`);
    }

    imageDeleted() {
        console.log('Image Deleted');
    }

    /**
     * Other buttons/icons user click events
     *
     * @param evt
     */
    sendAsset(evt) {
        // console.log('User wants to see 3D Scenes of this Asset:', this.scenes3D_array);
    }

    goToMonitor(evt) {
        // console.log('User will navigate to asset-monitor detail page!', evt);
    }
}
