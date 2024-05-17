import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { EditCellDefault } from '../../../lib/edit-cell-default';

@Component({
    selector: 'table-cell-edit-mode',
    template: `
        <ng-container [ngSwitch]="getEditorType()">
            <table-cell-custom-editor
                *ngSwitchCase="'custom'"
                [cell]="cell"
                [inputClass]="inputClass"
                [editingFormGroup]="editingFormGroup"
                (edited)="onEdited($event)"
                (selectedElem)="selectedElem.emit($event)">
            </table-cell-custom-editor>

            <table-cell-default-editor
                *ngSwitchDefault
                [editingFormGroup]="editingFormGroup"
                [cell]="cell"
                [inputClass]="inputClass"
                [updateColumnList]="updateColumnList"
                (edited)="onEdited($event)"
                (selectedElem)="selectedElem.emit($event)">
            </table-cell-default-editor>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditCellComponent extends EditCellDefault {

    // Pass down to the form (editing) Inputs the Table's "editingForm":
    @Input() editingFormGroup: UntypedFormGroup;

    constructor() {
        super();
    }
}
