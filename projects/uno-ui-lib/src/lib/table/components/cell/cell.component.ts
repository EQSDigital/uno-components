import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Grid } from '../../lib/grid';
import { Cell } from '../../lib/data-set/cell';
import { Row } from '../../lib/data-set/row';

@Component({
    selector: 'ng2-smart-table-cell',
    template: `
        <ng-container [ngSwitch]="isInEditing">
            <table-cell-view-mode
                *ngSwitchCase="false"
                [cell]="cell"
                [isExpanded]="isExpanded">
            </table-cell-view-mode>

            <table-cell-edit-mode
                *ngSwitchCase="true"
                [editingFormGroup]="editingFormGroup"
                [cell]="cell"
                [inputClass]="inputClass"
                [updateColumnList]="updateColumnList"
                (edited)="onEdited()"
                (selectedElem)="selectedElem.emit($event)">
            </table-cell-edit-mode>
        </ng-container>
    `
})
export class CellComponent {
    /**
     * Pass down to the form (editing) Inputs the Table's "editingForm":
     */
    @Input() editingFormGroup: FormGroup;

    @Input() grid: Grid;
    @Input() row: Row;
    @Input() createConfirm: EventEmitter<any>;
    @Input() isNew: boolean;
    @Input() cell: Cell;
    @Input() inputClass = '';
    @Input() mode = 'inline';
    @Input() isInEditing = false;
    @Input() isExpanded = false;
    @Input() updateColumnList: any;

    @Output() edited = new EventEmitter<any>();
    @Output() selectedElem = new EventEmitter<any>();

    onEdited() {
        if (this.isNew) {
            this.grid.create(this.grid.getNewRow(), this.createConfirm);
        }
    }
}
