import { Component, OnInit, ElementRef, Renderer2, AfterViewInit, EventEmitter, Output, OnChanges, ChangeDetectorRef } from '@angular/core';

import { DefaultEditorDirective } from '../../../lib/editor-cell-default';
import { Row } from '../../../lib/data-set/row';

@Component({
    selector: 'select-editor',
    template: `
        <div class="form-cell form-editor-selector" [formGroup]="editingFormGroup">
            <uno-picklist
                class="form-control"

                [data]="items"
                [(open)]="open"
                (selectedElem)="optionPicked(cell.row, cell.column.id)"
                [insertBlankElement]="!cell.column.isRequired"
                [isDisabled]="disabled"

                uno-pick
                [(unoPick)]="pick"

                [formControlName]="cell.column.id"
                ngDefaultControl

                filterDataField="value"

                fluid

                (click)="onClickDropdownButton($event)"
                (keydown.enter)="onEdited.emit($event)"
                (keydown.esc)="onStopEditing.emit()"

                uno-popover-trigger
                [unoPopover]="formErrorsContent"
                [unoPopoverOpen]="openValidatorPopover"
                unoPopoverSize="small"
                unoPopoverTooltip="true"
                [unoPopoverTheme]="cell.column.editor?.inputPopoverTheme || 'info'">
                    <span class="slds-truncate" [title]="pickLabel">{{ pickLabel }}</span>
                    <ng-template uno-picklist-item let-item>
                        <span [title]="item.value">{{ item.value }}</span>
                        <span *ngIf="item.title" [title]="item.title"> ({{ item.title }})</span>
                    </ng-template>

            </uno-picklist>
        </div>

        <!-- This Controller's Input Validator errors: -->
        <ng-template #formErrorsContent>
            <ng-container *ngFor="let errors of errorsData">
                <ng-container *ngIf="errors.input === cell.column.id">
                    <div *ngFor="let strError of errors.translated">
                        {{ strError }}
                    </div>
                </ng-container>
            </ng-container>
        </ng-template>
    `
})
export class SelectEditorComponent extends DefaultEditorDirective implements OnInit, AfterViewInit, OnChanges {

    open = false;
    pick: any = [];
    items = [];
    // Control <uno-picklist /> input text box's to work Form's validator states/classes:
    formEditorPicklist: HTMLElement;

    disabled = false;

    // Once an element is picked by the user, emit back:
    @Output() selectedElem = new EventEmitter<any>();

    constructor(
        private element: ElementRef,
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit() {
        // Get Picklist's HTML to, later, grab input box, for form validation to work with:
        this.formEditorPicklist = this.element.nativeElement;
        // Start with the original listed value (even if it is ''):
        this.pick.value = this.cell.getValue();
        this.cell.newValue = this.cell.getValue();

        if (this.cell.column.editor.isEditableUntil) {
            this.disabled = this.editingFormGroup.getRawValue()[this.cell.column.editor.isEditableUntil] ? false : true;
        } else {
            this.disabled = false;
        }

        this.subscription$.add(
            this.editingFormGroup.valueChanges.subscribe((val) =>
                Object.keys(val).forEach((key) => {
                    if (this.cell.column.editor && this.cell.column.editor.isEditableUntil &&
                        this.cell.column.editor.isEditableUntil === key && this.editingFormGroup.controls[key].value) {
                        this.disabled = false;
                    } else if (this.cell.column.editor && this.cell.column.editor.isEditableUntil &&
                        this.cell.column.editor.isEditableUntil === key) {
                        this.disabled = true;
                        this.editingFormGroup.controls[this.cell.column.id].setValue(null, { emitEvent: false });
                        this.pick.value = null;
                    }

                    this.cdr.detectChanges();
                })
            )
        );
    }

    ngAfterViewInit() {
        // As Picklist will get the Table's value (onInit: "this.cell.newValue = this.cell.getValue();"),
        // we have to check form's validity, @ this life cycle.
        // Give a sec for "editingFormGroup" to update 'invalid'/'valid'
        // - remember you called "this.updateReactiveFormInputValue();" @ ngOnInit()

        // Check if THIS row, where the component is showing, is on Editing or on Creating mode
        // - being on last one, don't need any init validation (all fields are empty - everybody knows what to do!)
        if (Object.keys(this.cell.row.data).length > 0) {   // <= EDITING !
            setTimeout(() => this.checkValidityAndShow());
        }
    }

    ngOnChanges() {
        // Do our list of items:
        this.items = this.cell.column.editor.config.list;
    }

    get pickLabel() {
        // Return new Picklist label:
        return this.pick.value || 'Select an option';
    }

    onClickDropdownButton(evt: any) {
        // Please see "lookup-editor.component.ts"'s inputIsTouched()
        // - same logic (only instead of "blur", we are interested on FIRST user "click" without Picking nothing)
        setTimeout(() => this.checkValidityAndShow());

        // Emit back (for DefaultEditor component)
        this.onClick.emit(evt);
    }

    // Finally the user picked up an option:
    optionPicked(row: Row, name: string) {
        // Update ngModel:
        this.cell.newValue = this.pick.value;
        // Update our editingForm:
        // this.updateReactiveFormInputValue(); //<= CAN not have (and, here, we don't need it) the setTimeout() waiting!
        // Only for "regular-browser-known" Inputs, for Angular not to throw error...
        // This "waiting" will make "this.cell.newValue = PREVIOUS this.pick.value"!!!!!
        this.editingFormGroup.get(this.cell.column.id).setValue(this.cell.newValue);
        // Sign this Input's controller validation:
        this.checkValidityAndShow();

        // Emit back, for DefaultEditor component: might be needed to trigger something extra, once user has picked an item:
        const argueObj = Object.assign({}, row, {
            selector: name,
            selectorData: this.pick
        });

        this.selectedElem.emit(argueObj);
    }

    // Check Input controller validation:
    checkValidityAndShow() {
        const formInput = this.formEditorPicklist.getElementsByTagName('button');

        // Tell the world:
        if (this.editingFormGroup.controls[this.cell.column.id].errors) {
            this.renderer.setStyle(formInput[0], 'border', `1px solid var(--vermillion)`);
            // For Validators messaging, also mark COMPONENT (NOT the Input - where user types! - of the UNO component) as touched!
            this.editingFormGroup.controls[this.cell.column.id].markAsTouched();
        } else {
            this.renderer.setStyle(formInput[0], 'border', `1px solid var(--light-periwinkle-two)`);
            // For Validators messaging, also mark COMPONENT (NOT the Input - where user types! - of the UNO component) as touched!
            this.editingFormGroup.controls[this.cell.column.id].markAsTouched();
        }
    }
}
