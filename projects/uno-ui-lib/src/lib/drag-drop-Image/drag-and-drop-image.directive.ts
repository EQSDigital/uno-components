import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[unoDragDropImage]'
})
export class DragAndDropImageDirective {
    @HostBinding('class.fileover') fileOver: boolean;

    @Input() public multiple = false;

    @Input() public disabled = false;

    @Output() public fileDropped = new EventEmitter<any>();

    @HostListener('dragover', ['$event']) onDragEvent(evt: any) {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = this.disabled ? false : true;
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
        if (files.length > 0 && !this.disabled) {
            if (this.multiple) {
                this.fileDropped.emit(files);
            } else {
                this.fileDropped.emit(files[0]);
            }
        }
    }
}
