import { Component } from '@angular/core';

import { ButtonDirective, IconComponent, ModalComponent } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [ButtonDirective, IconComponent, ModalComponent]
})

export class BasicComponent {
    openModalSmall = false;
    openModalLarge = false;
    openModalSuccess = false;
    openModalWarning = false;
    openModalConfirmDel = false;
    openModalConfirmAction = false;
    openModalDocsUpload = false;
    openModalSSCUpload = false;

    minDate = new Date();
    maxDate = new Date();

    isFormDirty = false;

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

    docUpload_possibleStatus = [
        { name: 'Draft', id: 1, siteId: 1 },
        { name: 'In Progress', id: 2, siteId: 1 },
        { name: 'Approved', id: 3, siteId: 1 },
        { name: 'Rejected', id: 4, siteId: 1 }
    ];

    docUpload_possibleResults = [
        { name: 'Result 1', id: 1, siteId: 1 },
        { name: 'Result 2', id: 2, siteId: 1 },
        { name: 'Result 3', id: 3, siteId: 1 },
        { name: 'Result 4', id: 4, siteId: 1 }
    ];;

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

    isDocsUploadFormValid(isItValid: boolean) {
        const addButton: any = document.querySelector('.add-uploaded-doc');
        const addButtonSSC: any = document.querySelector('.ssc-add-uploaded-doc');

        if (addButton) {
            addButton.disabled = !isItValid;
        }

        if (addButtonSSC) {
            addButtonSSC.disabled = !isItValid;
        }

        // console.log('Doc\'s Uploadd form is ', isItValid === true ? 'VALID' : 'INvalid!');
    }

    dispatchFormUploadData(formData: any) {
        console.warn('Upload form\'s Data:', formData);
    }

    loadResults(item: any) {
        if (item.haveDocumentStatus) {
            // this.docUpload_possibleStatus = [
            //     { name: 'Draft', id: 1, siteId: 1 },
            //     { name: 'In Progress', id: 2, siteId: 1 },
            //     { name: 'Approved', id: 3, siteId: 1 },
            //     { name: 'Rejected', id: 4, siteId: 1 }
            // ];
        } else {
            this.docUpload_possibleStatus = null;
        }

        if (item.HaveResultStatus) {
            // this.docUpload_possibleResults = [
            //     { name: 'Result 1', id: 1, siteId: 1 },
            //     { name: 'Result 2', id: 2, siteId: 1 },
            //     { name: 'Result 3', id: 3, siteId: 1 },
            //     { name: 'Result 4', id: 4, siteId: 1 }
            // ];
        } else {
            this.docUpload_possibleResults = null;
        }
    }

    editMode() {
        this.editData = {
            description: 'gggggg',
            documentDate: new Date(),
            documentResult: { name: 'Result 2', id: 2, siteId: 1 },
            documentStatus: { name: 'Result 3', id: 3, siteId: 1 },
            documentType: { name: 'Certificate', id: 1, siteId: 1, haveResultStatus: true, haveDocumentStatus: true },
            name: 'tttt',
            documentTag: 'ffff',
            documentFileName: 'Document name'
        };
    }

    editSSCMode() {
        this.editData = {
            documentType: {
                templateName: 'RGPD Template',
                name: 'test me',
                id: 56,
                siteId: 1
            },
            description: 'gggggg',
            expiredDate: new Date(2022, 9, 22),
            documentStatus: { name: 'Pending', id: 2, siteId: 1, color: '#ffeb3b' },
            name: 'tttt',
            documentFileName: 'document'
        };
    }

    formIsDirty(evt: boolean) {
        this.isFormDirty = evt;
    }

    onDeleteFile(evt: File) {
        console.log(evt);
    }

    onDownloadTemplate(evt: any) {
        console.log(evt);
    }
}
