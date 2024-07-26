import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'uno-drag-drop-file',
    templateUrl: 'drag-drop-file.component.html',
    styleUrls: ['drag-drop-file.component.scss']
})

export class DragDropFileComponent implements OnChanges {
    @Input() public maxFileSize: number;

    @Input() public multipleFiles = false;

    @Input() public file: File;

    /**
     * Disable to make changes.
     */
    @Input() public disabled = false;

    /**
     * Remove from templete the "trash" icon.
     */
    @Input() public disabledTrash = false;

    /**
     * Remove from template the "download" icon.
     */
    @Input() public disabledDownload = false;

    @Output() filesDropped = new EventEmitter<File | FileList>();

    @Output() deleteFile = new EventEmitter<File>();

    @Output() downloadFile = new EventEmitter<File>();

    @ViewChild('fileInput') private fileInput: ElementRef;

    public fileUploadIsToBig = false;

    constructor(private render: Renderer2) { }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.disabled?.currentValue) {
            this.disabledTrash = true;
        }
    }

    onClickUpload() {
        if (!this.disabled) {
            this.fileInput.nativeElement.click();
        }
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

        this.render.setProperty(this.fileInput.nativeElement, 'value', '');
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

    onDownloadFile(evt: any) {
        evt.stopPropagation();
        this.downloadFile.emit(this.file);
    }
}
