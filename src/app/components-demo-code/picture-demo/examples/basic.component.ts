import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { PictureComponent, ModalComponent, ButtonDirective } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    styleUrls: ['../picture-demo.component.scss'],
    standalone: true,
    imports: [PictureComponent, ModalComponent, ButtonDirective]
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
