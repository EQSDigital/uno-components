import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { EditCellDefault } from '../../../lib/edit-cell-default';

@Component({
    selector: 'table-cell-default-editor',
    template: `
        <ng-container [ngSwitch]="getEditorType()">
            <input-number-editor
                *ngSwitchCase="'inputNumber'"
                [editingFormGroup]="editingFormGroup"
                [cell]="cell"
                (onClick)="onClick($event)"
                (onEdited)="onEdited($event)"
                (onStopEditing)="onStopEditing()">
            </input-number-editor>

            <select-editor
                *ngSwitchCase="'selector'"
                [editingFormGroup]="editingFormGroup"
                [cell]="cell"
                [updateColumnList]="updateColumnList"
                (selectedElem)="selectedElem.emit($event)"
                (onClick)="onClick($event)"
                (onEdited)="onEdited($event)"
                (onStopEditing)="onStopEditing()">
            </select-editor>

            <textarea-editor
                *ngSwitchCase="'textarea'"
                [editingFormGroup]="editingFormGroup"
                [cell]="cell"
                (onClick)="onClick($event)"
                (onEdited)="onEdited($event)"
                (onStopEditing)="onStopEditing()">
            </textarea-editor>

            <checkbox-editor
                *ngSwitchCase="'checkbox'"
                [editingFormGroup]="editingFormGroup"
                [cell]="cell"
                (onClick)="onClick($event)">
            </checkbox-editor>

            <lookup-editor
                *ngSwitchCase="'lookup'"
                [editingFormGroup]="editingFormGroup"
                [cell]="cell">
            </lookup-editor>

            <switch-editor
                *ngSwitchCase="'switch'"
                [editingFormGroup]="editingFormGroup"
                [cell]="cell">
            </switch-editor>

            <!-- If none match, at least a simple Input box is offered: -->
            <input-editor
                *ngSwitchDefault
                [editingFormGroup]="editingFormGroup"
                [cell]="cell"
                (onClick)="onClick($event)"
                (onEdited)="onEdited($event)"
                (onStopEditing)="onStopEditing()">
            </input-editor>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultEditComponent extends EditCellDefault {

    // Pass down to the form (editing) Inputs the Table's "editingForm":
    @Input() editingFormGroup: UntypedFormGroup;

    constructor() {
        super();
    }
}
