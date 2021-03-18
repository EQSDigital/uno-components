import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html'
})

export class BasicComponent {
    openModalSmall = false;
    openModalLarge = false;
    openModalSuccess = false;
    openModalWarning = false;
    openModalConfirmDel = false;
    openModalConfirmAction = false;
    openModalAssets3d = false;
    openModalDocsUpload = false;
    openModalSSCUpload = false;

    minDate = new Date();
    maxDate = new Date();

    @ViewChild(ModalComponent) private modalComponent: ModalComponent;

    constructor() {
        const currentYear = new Date().getFullYear();
        this.minDate.setDate(this.minDate.getDate() - 1);
        this.maxDate = new Date(currentYear + 1, 11, 31);
    }

    scenes3dArray = [
        { uuid: 'qqq', url: 'qqqq', assetObject: 'qqqq', name: '1st 3D scene' },
        { uuid: 'qqq', url: 'qqqq', assetObject: 'qqqq', name: '2nd 3D scene' }
    ];

    docUpload_possibleTypes = [
        { name: 'Certificate', id: 1, siteId: 1, haveResultStatus: true, haveDocumentStatus: false },
        { name: 'Schedule', id: 2, siteId: 1, haveResultStatus: true, haveDocumentStatus: false },
        { name: 'Data-Book', id: 3, siteId: 1, haveResultStatus: false, haveDocumentStatus: true },
        { name: 'Drawing', id: 4, siteId: 1, haveResultStatus: true, haveDocumentStatus: true },
        { name: 'Techical Datasheet', id: 5, siteId: 1, haveResultStatus: false, haveDocumentStatus: false },
        { name: 'Estimation under evaluation to make it big!', id: 6, siteId: 1, haveResultStatus: true, haveDocumentStatus: true },
        { name: 'Others', id: 7, siteId: 1, haveResultStatus: false, haveDocumentStatus: true }
    ];
    docUpload_possibleStatus = null;
    docUpload_possibleResults = null;

    docUpload_possibleSSCStatus = [
        { name: 'Rejected', id: 1, siteId: 1, color: '#f44336' },
        { name: 'Pending', id: 2, siteId: 1, color: '#ffeb3b' },
        { name: 'Approved', id: 3, siteId: 1, color: '#13e825' },
    ];
    isFormToReset = false;
    isFormToBeSubmited = false;

    editData = null;

    modalClickEvt(buttonChosen: string) {
        console.warn('Button ' + buttonChosen + ' was clicked!');
    }

    scene3DSelected(sceneIdx: number) {
        // As soon as 1 scene is user selected, enable click on button OK to go to the 3d Scene App:
        const openButton: any = document.querySelector('.open-scene');

        openButton.disabled = false;

        console.log('Scene índex ' + sceneIdx + ' as been selected by the user!');
    }

    isDocsUploadFormValid(isItValid: boolean) {
        const addButton: any = document.querySelector('.add-uploaded-doc');
        const addButtonSSC: any = document.querySelector('.ssc-add-uploaded-doc');

        if (addButton) {
            addButton.disabled = !isItValid;
        }

        if (addButtonSSC) {
            addButtonSSC.disabled = !isItValid;
        }

        console.log('Doc\'s Uploadd form is ', isItValid === true ? 'VALID' : 'INvalid!');
    }

    dispatchFormUploadData(formData: any) {
        console.warn('Upload form\'s Data:', formData);
    }

    loadResults(item) {
        if (item.haveDocumentStatus) {
            this.docUpload_possibleStatus = [
                { name: 'Draft', id: 1, siteId: 1 },
                { name: 'In Progress', id: 2, siteId: 1 },
                { name: 'Approved', id: 3, siteId: 1 },
                { name: 'Rejected', id: 4, siteId: 1 }
            ];
        } else {
            this.docUpload_possibleStatus = null;
        }

        if (item.HaveResultStatus) {
            this.docUpload_possibleResults = [
                { name: 'Result 1', id: 1, siteId: 1 },
                { name: 'Result 2', id: 2, siteId: 1 },
                { name: 'Result 3', id: 3, siteId: 1 },
                { name: 'Result 4', id: 4, siteId: 1 }
            ];
        } else {
            this.docUpload_possibleResults = null;
        }
    }

    editMode() {
        this.editData = {
            Description: 'gggggg',
            DocumentDate: new Date(),
            DocumentResult: { name: 'Result 2', id: 2, siteId: 1 },
            DocumentStatus: { name: 'Result 3', id: 3, siteId: 1 },
            DocumentType: { name: 'Certificate', id: 1, siteId: 1, haveResultStatus: true, haveDocumentStatus: true },
            Name: 'tttt',
            DocumentTag: 'ffff',
            DocumentFileName: 'Document name'
        };
    }

    editSSCMode() {
        console.log(this.modalComponent.uploadForm);
        this.editData = {
            documentType: {
                name: 'test me',
                id: 56,
                siteId: 1
            },
            description: 'gggggg',
            comments: 'uuuuu',
            expiredDate: new Date().toISOString(),
            documentStatus: { name: 'Pending', id: 2, siteId: 1, color: '#ffeb3b' },
            name: 'tttt',
            documentFileName: 'document'
        };
    }
}
