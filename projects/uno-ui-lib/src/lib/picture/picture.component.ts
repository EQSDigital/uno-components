import { Component, HostListener, ElementRef, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'uno-picture',
    templateUrl: './picture.component.html',
    styleUrls: ['./picture.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PictureComponent implements OnChanges {
    /**
     * Define de width of the image.
     */
    @Input() width = '100%';

    /**
     * Define de height of the image.
     */
    @Input() height = '100%';

    /**
     * Define the default image, when no image set yet.
     */
    @Input() defaultImage: any;

    /**
     * Define the image to show.
     */
    @Input() image: any;

    /**
     * Define if want rounded image.
     */
    @Input() rounded = false;

    /**
     * Define if user only can see the image.
     */
    @Input() onlyViewImage = false;

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
     * Define if user can view image, to remove options on modals.
     */
    @Input() showViewImage = true;

    /**
     * Define if upload image icon shows
     */
    @Input() showUpIcon = false;

    /**
     * Define size of the uploado image icon
     */
    @Input() UpIconSize = 'large';

    /**
     * Emitte the image uploaded.
     */
    @Output() uploadedImage = new EventEmitter<File>();

    /**
     * Emitte the signal to delete image.
     */
    @Output() deleteImage = new EventEmitter();

    /**
     * Variable to control the overlay hover image.
     */
    showOverlay = false;

    /**
     * Variable to control if show or not the options.
     */
    showDropdown = false;

    /**
     * Variable to set the image when user choose image from system.
     */
    imageChangedEvent;

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
    originalFileNameType: { name: string };

    /**
     * Variable to set the initial position of the dropdown,
     * and used on template.
     */
    pictureDropdownPosition = { top: '50px', left: '50px' };

    /**
     * Define the icon to show on overlay.
     */
    iconOverlay = 'edit';

    /**
     * Define the text to show on overlay.
     */
    textOverlay = 'changeImage';

    /**
     * Define the text to show on view image.
     */
    viewImageText = 'viewImage';

    /**
     * Define the text to show on edit image.
     */
    editImageText = 'editImage';

    /**
     * Define the text to show on upload image.
     */
    uploadImageText = 'uploadImage';

    /**
     * Define the text to show on remove image.
     */
    removeImageText = 'removeImage';

    /**
     * Host listner to know when user click outside component,
     * to close the dropdown and remove overlay.
     *
     * @param evt - The event dispatch for the host listner.
     */
    @HostListener('window:click', ['$event'])
    clickOut(evt) {
        // If click inside image, show dropdown.
        if (this.eRef.nativeElement.contains(evt.target) && this.image) {
            this.showDropdown = true;
        } else { // So, remove dropdown and overlay.
            this.showDropdown = false;
            this.showOverlay = false;
        }
    }

    constructor(private eRef: ElementRef) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.image && changes.image.currentValue) {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');

                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;

                canvas.getContext('2d').drawImage(img, 0, 0);

                canvas.toBlob((blob: Blob) => {
                    this.originalFileNameType = {
                        name: this.image.split('/')[this.image.split('/').lenght - 1]
                    };

                    this.savedImageCropped = {
                        target: {
                            files: [new File([blob], this.originalFileNameType.name, { type: blob.type })]
                        }
                    };
                });

            };

            img.crossOrigin = 'anonymous';
            img.src = this.image;
        }

        // If is the default image user can't edit.
        if (this.defaultImage && !this.image) {
            this.showEditImage = false;
        }
    }

    /**
     * This method detect the position of the mouse click,
     * and set top/left of the dropdown.
     *
     * @param evt - Detect mouse event.
     */
    onPictureClick(evt: MouseEvent) {
        if (this.onlyViewImage) {
            this.onViewImage();
        } else if (this.image) {
            this.pictureDropdownPosition = {
                top: `${evt.offsetY}px`,
                left: `${evt.offsetX}px`
            };
            this.showDropdown = !this.showDropdown;
        } else {
            this.onUploadImage();
        }
    }

    /**
     * This method detect when mouse leave the image.
     */
    onMouseLeavePicture() {
        // Only remove the overlay when dropdown are close.
        if (!this.showDropdown) {
            this.showOverlay = !this.showOverlay;
        }
    }

    /**
     *
     */
    onViewImage() {
        this.showDropdown = false;
        this.openImgViewer = true;
    }

    onEditImage() {
        this.showDropdown = false;
        this.imageChangedEvent = this.savedImageCropped;
        this.openImgCropper = true;
    }

    /**
     * This method open the system file to choose a image.
     */
    onUploadImage() {
        this.showDropdown = false;

        // Create the input type file, because it's need dropdown when user click on upload image.
        const inputFile = document.createElement('input');
        inputFile.setAttribute('type', 'file');
        inputFile.setAttribute('accept', 'image/*');
        inputFile.click();
        // When user choose a image.
        inputFile.onchange = ((evt) => {
            this.originalFileNameType = {
                name: evt['path'][0].files[0].name
            };

            this.imageChangedEvent = {
                target: {
                    files: evt['path'][0].files
                }
            };
        });
    }

    onRemoveImage(evt) {
        evt.stopPropagation();
        this.showDropdown = false;
        this.image = null;
        this.deleteImage.emit();
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

    /**
     * User is satisfied with the cropped result of the image he/she uploaded from local machine
     * and is saying he/she wants this final croppped result to be saved (@ installation) as the pretended image
     */
    saveImgCropper() {
        this.openImgCropper = false;
        const reader = new FileReader;

        reader.onload = () => {
            this.image = reader.result;
        };

        reader.readAsDataURL(this.savedImageCropped.target.files[0]);

        this.uploadedImage.emit(this.savedImageCropped.target.files[0] as File);
    }
}
