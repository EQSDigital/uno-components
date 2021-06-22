import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'uno-dragDropFile',
    templateUrl: 'drag-drop-file.component.html',
    styleUrls: ['drag-drop-file.component.scss']
})

export class DragDropFileComponent {
    @Input() public maxFileSize: number;

    @Input() public multipleFiles = false;

    @Input() public file: File;

    @Output() filesDropped = new EventEmitter();

    @Output() deleteFile = new EventEmitter();

    @ViewChild('fileInput') private fileInput: ElementRef;

    public fileUploadIsToBig = false;

    onClickUpload() {
        this.fileInput.nativeElement.click();
    }

    fileToUploadChange(evt: any) {
        this.fileUploadIsToBig = false;

        Array.from(evt.target.files).forEach((file: File) => {
            if (this.maxFileSize && file.size >= this.maxFileSize) {
                this.fileUploadIsToBig = true;
                return;
            }
        });

        if (this.multipleFiles) {
            this.filesDropped.emit(evt.target.files);
        } else {
            this.filesDropped.emit(evt.target.files[0]);
            this.file = evt.target.files[0];
        }
    }

    onFileDropped(file: File | FileList) {
        if (this.multipleFiles) {
            this.filesDropped.emit(file);
        } else {
            this.filesDropped.emit(file);
            this.file = file as File;
        }
    }

    onDeleteFile(evt: any) {
        evt.stopPropagation();
        this.deleteFile.emit(this.file);
    }

}
