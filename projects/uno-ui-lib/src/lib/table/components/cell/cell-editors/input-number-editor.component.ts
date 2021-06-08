import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';

import { DefaultEditorDirective } from '../../../lib/editor-cell-default';

@Component({
    selector: 'input-number-editor',
    styleUrls: ['./editor.component.scss'],
    template: `
        <div class="form-cell form-editor-number-input" [formGroup]="editingFormGroup">
            <input
                type="number"
                [pattern]="numberPattern"
                [min]="numberMin"
                [max]="numberMax"
                [step]="numberStep"

                class="form-control slds-input"
                [placeholder]="cell.column.title | translate"

                [formControlName]="cell.column.id"
                (input)="cell.newValue = $event.target.value;"
                [name]="cell.column.id"

                (click)="onClick.emit($event)"
                (keydown.enter)="onEdited.emit($event)"
                (keydown.esc)="onStopEditing.emit()"

                uno-popover-trigger
                [unoPopover]="formErrorsContent"
                [unoPopoverOpen]="openValidatorPopover"
                unoPopoverSize="small"
                unoPopoverTooltip="true"
                [unoPopoverTheme]="cell.column.editor?.inputPopoverTheme || 'info'">
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputNumberEditorComponent extends DefaultEditorDirective implements OnInit {

    // Control Input number box's to work Form's validator states/classes:
    formEditorInputNumber: HTMLElement;

    // The HTML5 typical Input (type="number") parameters:
    numberPattern: string;
    numberMin: number;
    numberMax: number;
    numberStep: number;

    open: boolean;

    constructor(private formInput: ElementRef) {
        super();
    }

    ngOnInit() {
        // Get Input number's HTML to, later, grab input box, for form validation to work with:
        this.formEditorInputNumber = this.formInput.nativeElement;

        // Complete the HTML5 Input number parameters:
        // Bring in the configuration declared @ "table-demo-nano.component.ts":
        const configProp = this.cell.column.getConfig();
        const validatorsProp = this.cell.column.getValidators();

        this.numberPattern = validatorsProp.pattern ? validatorsProp.pattern : '';
        // THE VALUE 0 IT'S SEEN LIKE A FALSE, SO IT'S NEED CHECK IF validatorProp HAVE THE PROPERTIES
        this.numberMin = validatorsProp.hasOwnProperty('min') ? validatorsProp.min : null;
        this.numberMax = validatorsProp.hasOwnProperty('max') ? validatorsProp.max : null;
        this.numberStep = configProp.numberStep ? configProp.numberStep : null;
    }
}
