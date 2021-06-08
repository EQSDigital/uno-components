import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DefaultEditorDirective } from '../../../lib/editor-cell-default';

@Component({
    selector: 'input-editor',
    styleUrls: ['./editor.component.scss'],
    template: `
        <div class="form-cell form-editor-input" [formGroup]="editingFormGroup">
            <input
                class="form-control slds-input"
                [placeholder]="!cell.column.isEditable ? '-' : cell.column.title | translate"

                [formControlName]="cell.column.id"
                [readonly]="!cell.column.isEditable"
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
export class InputEditorComponent extends DefaultEditorDirective {
    constructor() {
        super();
    }
}
