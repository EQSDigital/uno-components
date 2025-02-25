import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { DefaultEditorDirective } from '../../../lib/editor-cell-default';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PopoverTriggerDirective } from '../../../../popover/popover.component';
import { LookupComponent } from '../../../../lookup/lookup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'lookup-editor',
    styleUrls: ['./editor.component.scss'],
    template: `
        <div class="form-cell form-editor-lookup" [formGroup]="editingFormGroup">
          <uno-lookup
            class="form-control"
        
            [(value)]="lookUpAsyncScrollerStr"
            [lookup]="lookupAsyncScroller"
            [field]="searchField"
            placeholder="Start typing GitHub's {{ searchField }} Name:"
            [isDisabled]="!cell.column.isEditable"
        
            [(pick)]="githubUser"
        
            [formControlName]="cell.column.id"
            ngDefaultControl
        
            (inputWasTouched)="inputIsTouched($event)"
        
            (scrollEndReached)="trigger_cumulatedLookupAsyncScroller($event)"
            (pickChange)="onEditedCompleter($event)"
        
            uno-popover-trigger
            [unoPopover]="formErrorsContent"
            [unoPopoverOpen]="openValidatorPopover"
            unoPopoverSize="small"
            unoPopoverTooltip="true"
            [unoPopoverTheme]="cell.column.editor?.inputPopoverTheme || 'info'">
            <div uno-lookup-header class="slds-text-body--small">
              Github users with "{{ lookUpAsyncScrollerStr }}" &#64; login name:
              <b>{{ asyncScrollerCurrentResults }}</b> / <b style="color: red;">{{ asyncScrollerTotalResults }}</b>
            </div>
            <ng-template uno-lookup-item let-itemAsync>
              <img src="{{ itemAsync.avatar_url }}" class="slds-avatar slds-m-right--xx-small">
              {{ itemAsync[searchField] }}
            </ng-template>
          </uno-lookup>
        </div>
        
        <!-- This Controller's Input Validator errors: -->
        <ng-template #formErrorsContent>
          @for (errors of errorsData; track errors) {
            @if (errors.input === cell.column.id) {
              @for (strError of errors.translated; track strError) {
                <div>
                  {{ strError }}
                </div>
              }
            }
          }
        </ng-template>
        `,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, LookupComponent, PopoverTriggerDirective]
})
export class LookupEditorComponent extends DefaultEditorDirective implements OnInit, AfterViewInit {

    urlAPI = '';
    searchField = '';
    githubUser = '';

    lookUpAsyncScrollerStr = '';
    asyncScrollerPageNumber = 1;
    // Flag if at each http call we'll present the (current, 1st) page results or cumulate each coming (new) page of Items:
    asyncCumulateItems: boolean;
    arrayCumulatedItems = [];
    // Catch the total number of items brought by each Service call:
    asyncScrollerTotalResults: number;
    asyncScrollerCurrentResults: number;
    // Control <uno-lookup /> input text box's to work Form's validator states/classes:
    formEditorLookup: HTMLElement;

    constructor(
        private element: ElementRef,
        private renderer: Renderer2,
        private http: HttpClient
    ) {
        super();
    }

    // ============================
    // Life cycle Methods:
    // ============================
    ngOnInit() {
        // Get Lookup's HTML to, later, grab input box, for form validation to work with:
        this.formEditorLookup = this.element.nativeElement;

        // Get config values and fill <uno-lookup /> input with the BD/Grid value:
        if (this.cell.column.editor && this.cell.column.editor.type === 'lookup') {
            // Bring in the configuration declared @ "table-demo.component.ts":
            const config = this.cell.column.getConfig().lookupConfig;
            // Use the passed in parameters:
            this.urlAPI = config.urlAPI;
            this.searchField = config.searchField;

            // Start with the original (listed View) value (even if it is ''):
            this.githubUser = this.cell.newValue;
        }
    }

    ngAfterViewInit() {
        // As Input/Pill will get the Table's value (onInit: "this.githubUser = this.cell.newValue;"),
        // we have to check form's validity, @ this life cycle.
        // Give a sec for "editingFormGroup" to update 'invalid'/'valid'
        // - remember you called "this.updateReactiveFormInputValue();" @ ngOnInit()

        // Check if THIS row, where the component is showing, is on Editing or on Creating mode
        // - being on last one, don't need any init validation (all fields are empty - everybody knows what to do!)
        if (Object.keys(this.cell.row.data).length > 0) {   // <= EDITING !
            setTimeout(() => this.checkValidityAndShow());
        }
    }

    // ============================
    // Events vs Lookup DATA:
    // ============================
    // Look inside an Observable's PAGINATED http GET request Service, cumulating onScrollDown bottom limit reached:
    lookupAsyncScroller = (query: string): Observable<any> => {
        // While there's no Pick, update NgModel with searched term, in case user wants to use it even without a Picked lookup fetch:
        const formInput = this.checkCurrentInputTag();
        // See if it's an empty value (i.e. delete previous value, by clickng "x" current <uno-pill /> with previous Picked element)
        if (formInput[0].tagName === 'INPUT') {     // Might have changed to a <uno-pill /> if user picked an element...
            // => HERE, 'query' and 'this.lookUpAsyncScrollerStr' would be null!
            // It's na INPUT for sure => only now we can update!
            this.cell.newValue = this.lookUpAsyncScrollerStr;
            // As so, we have to check form's validity, here - i.e. if Validators.required, NULL/EMPTY values can NOT be submited:
            this.checkValidityAndShow();
        }

        // Github Users API will throw an error and stop working if an EMPTY query is passed in!
        if (!query) { return null; }

        // Allow for returning just first page, again:
        if (!this.asyncCumulateItems) {
            this.asyncScrollerPageNumber = 1;
            this.arrayCumulatedItems = [];
            this.asyncScrollerCurrentResults = 0;
        }

        // TODO <Check this code here>
        const observable = this.http.get(this.urlAPI + `?q=${query}&page=${this.asyncScrollerPageNumber}`);

        return observable.pipe(map((response: any) => {
            // Instead, we return, with the received called (PAGINATED) service items or with the cumulated array of pages:
            this.arrayCumulatedItems = this.asyncCumulateItems === true ?
                this.arrayCumulatedItems.concat(response.items) : response.items;

            const dataToReturn = this.asyncCumulateItems ? this.arrayCumulatedItems : response.items;

            // All conditions done? Restart!
            this.asyncCumulateItems = false;

            // Update TotalResults and return the choosen Data - 1st page or cumulated one:
            this.asyncScrollerTotalResults = response.total_count;
            this.asyncScrollerCurrentResults = dataToReturn.length;
            return dataToReturn;
        }));
    }

    // Someone was at <uno-lookup /> Input box and just left it (either Look[ing]up for something or without typing):
    inputIsTouched(evt) {
        /* We reaaly only need it while user goes there and types nothing;
        after 1st typing ('ng-dirty'), method "this.checkValidityAndShow()" is already called
        (@ "lookupAsyncScroller()"'s Input typing and @ "onEditedCompleter()"'s Dropdown picked object) */
        setTimeout(() => this.checkValidityAndShow());
    }

    // trigger_lookupAsyncScroller(searchStr) {
    // console.warn('Input has CHANGED => HTTP Service triggered by "' + searchStr + '"!');
    // }

    // Check if the end of the list has been reached, by mouse/finger scrollDown:
    trigger_cumulatedLookupAsyncScroller = (evt) => {
        if (evt.endReached) {
            // Trigger another Service call, but, this time, to cumulate NEXT page with currently pulled items - current search user:
            this.asyncCumulateItems = true;
            this.asyncScrollerPageNumber = this.asyncScrollerPageNumber + 1;
        }
    }

    // Finally the user picked up a Github User (or eliminated - pickedObj=null - the picked one)
    onEditedCompleter(pickedObj): boolean {
        // Update ngModel value with the Picked Obj
        this.cell.newValue = (pickedObj) ? pickedObj[this.searchField] : '';

        // Update our Reactive Form with either '' OR "pickedObj"
        // this.updateReactiveFormInputValue(); //<= CAN not have (and, here, we don't need it) the setTimeout() waiting!
        // Only for "regular-browser-known" Inputs, for Angular not to throw error...
        // This "waiting" will make "this.cell.newValue = this.lookUpAsyncScrollerStr" (previous - to search for - value)!!!!!
        this.editingFormGroup.get(this.cell.column.id).setValue(this.cell.newValue);
        // Check Validity (i.e., code might come here for an eliminated previous Pick... this.cell.newValue = ''
        // => We have an Input box and NOT a Pill (remember "lookupAsyncScroller()" is NOT triggered, while user doesn't type)
        this.checkValidityAndShow();

        // Re-init:
        this.lookUpAsyncScrollerStr = '';
        this.asyncCumulateItems = false;
        this.asyncScrollerPageNumber = 1;
        this.arrayCumulatedItems = [];

        return false;
    }

    // ============================
    // AUX functions:
    // ============================

    // Check if at THIS MOMENT, <uno-lookup /> has, at it's Input place
    // , an Input text (trigger a fetch) or a <uno-pill /> component (Picked element from Dropdown)
    checkCurrentInputTag() {
        const inputContainer = this.formEditorLookup.getElementsByClassName('slds-form-element__control')[0];
        // We can have 2 possible HTML tags: on "Start typing..." an Input, and, when element is Picked, a <uno-pill /> tag:
        const formInputText = inputContainer.getElementsByTagName('input');
        const formInputPill = inputContainer.getElementsByTagName('uno-pill');

        return (inputContainer.contains(formInputText[0])) ? formInputText : formInputPill;
    }

    // Check Input controller validation:
    checkValidityAndShow() {
        setTimeout( // Give a sec for the switch between tags occurs inside <uno-lookup />
            () => {
                const formInput = this.checkCurrentInputTag();
                const statusColor = this.editingFormGroup.controls[this.cell.column.id].errors ? 'var(--special-red-2)' : '';

                // Tell the world:
                if (statusColor) {
                    this.renderer.setStyle(formInput[0], 'border', `1px solid ${statusColor};`);
                    // For Validators messaging, also mark COMPONENT (NOT the Input - where user types! - of the UNO component) as touched!
                    this.editingFormGroup.controls[this.cell.column.id].markAsTouched();
                }
            }
        );
    }
}
