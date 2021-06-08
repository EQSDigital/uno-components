import { Component, OnInit, ElementRef } from '@angular/core';

import { DefaultEditorDirective } from '../../../lib/editor-cell-default';

@Component({
    selector: 'checkbox-editor',
    styleUrls: ['./editor.component.scss'],
    template: `
        <div class="form-cell form-editor-checkbox" [formGroup]="editingFormGroup">
            <input
                type="checkbox"
                class="form-control"

                [formControlName]="cell.column.id"
                [name]="cell.column.id"

                (click)="onClick.emit($event)"
                (change)="onChange($event)"

                uno-popover-trigger
                [unoPopover]="formErrorsContent"
                [unoPopoverOpen]="openValidatorPopover"
                unoPopoverSize="small"
                unoPopoverTooltip="true"
                [unoPopoverTheme]="cell.column.editor?.inputPopoverTheme || 'info'" >
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
    `,
})
export class CheckboxEditorComponent extends DefaultEditorDirective implements OnInit {

    constructor(private element: ElementRef) {
        super();
    }

    // ============================
    // Life cycle Methods:
    // ============================
    ngOnInit() {
        const cBox: HTMLElement = this.element.nativeElement.getElementsByTagName('input');
        /* At Init, check, or not, the checkbox, regarding View/DB value.
        Remember that property "checked", once written @ HTML (acka upper "template:"),
        independent of the passed value, ALWAYS checks a checkbox!
        You can't go by that road... remember "checkbox" value is only assumed for the Input IF the Input is checked!
        So, every time the Init Editing row is called, with a "click()" we check it, if it's the case:*/

        // Give it time to full complete Editing row DOM:
        setTimeout(() => {
            if (this.cell.column.getConfig()) {
                if (this.cell.getValue() === this.cell.column.getConfig().true) {
                    if (!cBox[0].checked) {
                        cBox[0].click();
                    }    // It's now checked!
                    /* Remember editing form (only one, independently of the open editing row!)
                    might be currently checked from previous row editing... */
                } else if (this.cell.getValue() === this.cell.column.getConfig().false) {
                    if (cBox[0].checked) {
                        cBox[0].click();
                    }    // It's now UN-checked!
                } else { // It had no DBase defined value:
                    if (cBox[0].checked) {
                        cBox[0].click();
                    }    // It's now UN-checked!
                }

                // Plain boolean value:
            } else {
                if (this.cell.getValue() === true) {
                    if (!cBox[0].checked) {
                        cBox[0].click();
                    }    // It's now checked!
                } else if (this.cell.getValue() === false) {
                    if (cBox[0].checked) {
                        cBox[0].click();
                    }    // It's now UN-checked!
                } else { // It had no DBase defined value:
                    if (cBox[0].checked) {
                        cBox[0].click();
                    }    // It's now UN-checked!
                }
            }
        });
    }

    // ============================
    // Events:
    // ============================
    onChange(event: any) {
        // The smart-table needs to know the translated string when user presses "Update", triggering this event:
        this.cell.newValue = event.target.checked ? this.booleanToString().customTrue : this.booleanToString().customFalse;
        // Our Form, @ any checkbox, only deals with boolean! It's up to us to do the translations:
        this.editingFormGroup.get(this.cell.column.id).setValue(event.target.checked);

    }

    // ============================
    // AUX functions:
    // ============================
    /**
     * Make sure "this.cell.newValue" gets correct (Table instalation) translated value:
     */
    booleanToString() {
        // Might need translation or not ( simple true/false can be directly used by Form):
        const trueVal = (this.cell.column.getConfig() && this.cell.column.getConfig().true) || true;
        const falseVal = (this.cell.column.getConfig() && this.cell.column.getConfig().false) || false;

        return { customTrue: trueVal, customFalse: falseVal };
    }

    /**
     * On the other hand, our Form, @ checkbox Input, only works with boolean. So... we translate back:
     */
    strToBoolean(str) {
        console.error('str:', str, this.cell.column.getConfig());
        if (str === '') {
            return false;
        }

        // In fact, 'str' is a boolean - no (necessary) translation was declared at Table config!
        return ((this.cell.column.getConfig()) ? (str === this.cell.column.getConfig().true) ? true : false : str);
    }
}
