import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'uno-drag-drop-image',
    templateUrl: 'drag-drop-image.component.html',
    styleUrls: ['drag-drop-image.component.scss']
})

export class DragDropImageComponent {
    @Input() public maxFileSize: number;

    @Input() public file: File;

    @Input() public disabled = false;

    @Input() public disabledDownload = true;

    @Input() public disabledDelete = false;

    /**
     * Define the image to show.
     */
    @Input() image: any;

    @Output() deleteFile = new EventEmitter<File>();

    @Output() downloadFile = new EventEmitter<File>();

    /**
     * Emitte the image uploaded.
     */
    @Output() uploadedImage = new EventEmitter<File>();

    public fileUploadIsToBig = false;

    public label = "chooseImageLabel";

    /**
     * Variable to set the image when user choose image from system.
     */
    imageChangedEvent;
    imageSource;

    /**
     * Variable to control modal image cropper.
     */
    openImgCropper = false;

    /**
     * Variable to control modal image viewer.
     */
    openImgViewer = false;

    /**
     * Variable to set imaged cropped for edit again image cropped.
     */
    savedImageCropped;

    /**
     * variable to set the name and extention of the image.
     */
    originalFileNameType: { name: string, type: string };

    onFileDropped(file: any) {
        if (!this.disabled) {
            this.originalFileNameType = {
                name: file.name,
                type: file.type
            };

            this.imageChangedEvent = {
                target: {
                    files: [file]
                }
            };
            this.openImgCropper = true;
        }
    }

    onDeleteFile(evt: any) {
        evt.stopPropagation();
        this.image = null;
        this.deleteFile.emit(this.image);
    }

    onDownloadFile(evt: any) {
        evt.stopPropagation();
        this.downloadFile.emit(this.image);
        console.log(this.image)
    }

    /**
     * User is satisfied with the cropped result of the image he/she uploaded from local machine
     * and is saying he/she wants this final croppped result to be saved (@ installation) as the pretended image
     */
    saveImgCropper() {
        this.openImgCropper = false;

        if (this.savedImageCropped && this.savedImageCropped.target) {
            const reader = new FileReader;

            reader.onload = () => {
                this.image = reader.result;
            };

            reader.readAsDataURL(this.savedImageCropped.target.files[0]);

            this.uploadedImage.emit(this.savedImageCropped.target.files[0] as File);
        }
    }

    /**
     * This method open the system file to choose a image.
     */
    onUploadImage() {
        if ((this.image == null || this.image == undefined) && !this.disabled) {
            // Create the input type file, because it's need dropdown when user click on upload image.
            const inputFile = document.createElement('input');
            inputFile.setAttribute('type', 'file');
            inputFile.setAttribute('accept', 'image/*');
            inputFile.click();
            // When user choose a image.
            inputFile.onchange = ((evt: any) => {
                this.originalFileNameType = {
                    name: evt.target.files[0].name,
                    type: evt.target.files[0].type
                };

                this.imageChangedEvent = {
                    target: {
                        files: evt.target.files
                    }
                };
            });
        } else {
            this.openImgViewer = true;
        }
    }

    onUploadImageIcon() {
        // Create the input type file, because it's need dropdown when user click on upload image.
        const inputFile = document.createElement('input');
        inputFile.setAttribute('type', 'file');
        inputFile.setAttribute('accept', 'image/*');
        inputFile.click();
        // When user choose a image.
        inputFile.onchange = ((evt: any) => {
            this.originalFileNameType = {
                name: evt.target.files[0].name,
                type: evt.target.files[0].type
            };

            this.imageChangedEvent = {
                target: {
                    files: evt.target.files
                }
            };
        });
    }

    /**
     * The resulted cropped image is coming on "event" on different properties:
     * @ event.base64 if <uno-image-cropper />'s @Input() outputType is "base64"
     * @ event.file if <uno-image-cropper />'s @Input() outputType is "file"
     *
     * @param event
     */
    imageCropped(event) {
        // Made a object like a <input type="file"> for when user click on edit show the cropped image.
        Object.assign(event.file, {
            lastModifiedDate: new Date(),
            name: `${this.originalFileNameType.name}`
        });

        this.savedImageCropped = {
            target: {
                // files: [new File([event.file], this.originalFileNameType.name, { type: 'png' })]
                files: [event.file]
            }
        };
    }

}
