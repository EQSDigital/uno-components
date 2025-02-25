import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ButtonDirective, IconComponent, PopoverBehaviorDirective, PopoverClickBehaviorDirective, PopoverTriggerDirective } from 'uno-ui-lib';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    styleUrls: ['../popover-demo.component.css'],
    standalone: true,
    imports: [ButtonDirective, IconComponent, DatePipe, PopoverTriggerDirective, PopoverBehaviorDirective, PopoverClickBehaviorDirective]
})

export class BasicComponent {
    placement = 'left';
    open = true;

    openClickMe = false;
    openClickMeAlso = false;
    openClickMeToo = false;

    infoContentData = {
        createdBy: 'Ricardo Coelho',
        createdDate: new Date('Fri Jul 27 2018 15:23:00'),
        modifiedBy: 'Pedro Ferreira',
        modifiedDate: new Date()
    };

    /**
     * Array of files to download/delete
     *
     * It's a predefined structure @ NANO app, which depends on the API's fetched type (WorksheetDocumentDto) of data:
        export interface IdentityDto {
            Id?: number;
            SiteId?: number;
        }
        export interface WorksheetDocumentDto extends IdentityDto {
            SMSessionCauseId: number;
            SMSessionCauseSiteId: number;
            SMWorkshopDocumentId: number;
            SMWorkshopDocumentSiteId: number;
            DocumentName?: string;
            DocumentDescription?: string;
            DocumentType?: string;
            FileName?: string;
            Extension?: string;
            DocumentTypeId?: number;
            DocumentTypeSiteId?: number;
        }
     *
     * But, sometimes, you can have other types (i.e. NDTDocumentListDto), @ NANO app:
        export interface NamedDto extends IdentityDto {
            Name?: string;
            Description?: string;
        }
        export interface NDTDocumentListDto extends NamedDto {
            Type?: string;
            ModifiedDate: Date;
            DocumentRevisionId: number;
            DocumentRevisionSiteId: number;
            FileName?: string;
            FileExtension?: string;
        }
     *
     * So... you have, HERE. to prevent errors on some NON EXISTENT properties!
     * On the other hand, SHOULD BE @ .ts file coding (from where you want to use the UNO ui-component library's component)
     * that, if you must, property name's can be translated from the received DATA to the component's properties/vars
     * (i.e. from "FileName" to "fileName")
     * We assume ALL have "fileName" and "fileExtension" - all the others can exist OR NOT.
     *
     */
    downloadContentData = {
        // tslint:disable:max-line-length
        numberFiles: '4 files',
        files: [
            { fileName: 'fileToDownload_1', fileExtension: '.test', documentDescription: 'This is the description of the fileToDownload_1 document!', modifiedDate: new Date('Fri Jul 27 2018 15:23:00') },
            { fileName: 'fileToDownload_2_with_a_lot_of_characteres', fileExtension: '.png' },
            { fileName: 'fileToDownload_3', fileExtension: '.png', modifiedDate: new Date() },
            { fileName: 'fileToDownload_4', fileExtension: '.pdf', documentDescription: 'This is the description of the fileToDownload_4 document!' }
        ]
    };

    datePickerData = {
        dateChosen: null,
        numYearsBefore: 3,
        numYearsAfter: 2
        // OTHER POSSIBLE COSTUMIZATIONS for <uno-datepicker /> NOT CONSIDERED @ [unoPopoverTemplateData]="datePickerData":
        // (they will assume these default values @ "datepicker.component.ts")
        // , dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        // , dayNamesLong: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursda', 'Friday', 'Saturday']
        // , monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        // , todayButton: true
    };

    templateEventEmited(objData: any) {
        console.error('********************************************');
        console.warn('A certain <uno-popover /> template HAS EMITTED an Event!');
        console.log('Check where from, inside the received Obj:', objData);
        console.error('********************************************');
    }

    change(placement: string) {
        this.open = true;
        this.placement = placement;
    }
}
