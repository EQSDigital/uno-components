import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[unoDragDropFile]'
})
export class DragAndDropFileDirective {
    @HostBinding('class.fileover') fileOver: boolean;

    @Input() public multiple = false;

    @Output() public fileDropped = new EventEmitter<any>();

    @HostListener('dragover', ['$event']) onDragEvent(evt: any) {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = true;
    }

    @HostListener('dragleave', ['$event']) onDragLeave(evt: any) {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = false;
    }

    @HostListener('drop', ['$event']) onDrop(evt: any) {
        evt.preventDefault();
        evt.stopPropagation();

        this.fileOver = false;
        const files = evt.dataTransfer.files;
        if (files.length > 0) {
            if (this.multiple) {
                this.fileDropped.emit(files);
            } else {
                this.fileDropped.emit(files[0]);
            }
        }
    }
}
