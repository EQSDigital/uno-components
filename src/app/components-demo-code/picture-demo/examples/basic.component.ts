import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { PictureComponent } from 'projects/uno-ui-lib/src/public_api';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    styleUrls: ['../picture-demo.component.scss']
})

export class BasicComponent implements AfterViewInit {
    @ViewChild('picture') unoPicture: PictureComponent;

    openModalLarge: boolean;

    uploadedImage(evt) {
        console.log(evt);
    }

    deletedImage() {
        console.log('Delete Image');
    }

    ngAfterViewInit() {
        this.unoPicture.textOverlay = 'Alterar imagem';
        this.unoPicture.viewImageText = 'Carregar imagem';
        this.unoPicture.editImageText = 'Editar imagem';
        this.unoPicture.uploadImageText = 'Carregar imagem';
        this.unoPicture.removeImageText = 'Remover imagem';
    }
}
