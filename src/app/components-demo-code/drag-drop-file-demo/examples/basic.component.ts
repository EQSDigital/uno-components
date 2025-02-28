import { Component } from '@angular/core';

import { DragDropFileComponent, DragDropImageComponent } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [DragDropFileComponent, DragDropImageComponent]
})

export class BasicComponent {
    public files: any[] = [];

    onFilesDropped(evt: File | FileList) {
        if (evt instanceof FileList) {
            for (const item of Array.from(evt)) {
                this.files.push(item);
            }
        } else {
            this.files.push(evt);
        }
    }

    onDeleteFile(evt: any) {
        console.log(evt);
    }

    onDownloadFile(evt: any) {
        console.log(evt);
    }

    onUploadImage(evt: any) {
        console.log(evt);
    }

}