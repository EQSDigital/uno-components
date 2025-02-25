import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { Grid } from '../../lib/grid';
import { Cell } from '../../lib/data-set/cell';
import { Row } from '../../lib/data-set/row';
import { EditCellComponent } from './cell-edit-mode/edit-cell.component';
import { ViewCellComponent } from './cell-view-mode/view-cell.component';


@Component({
    selector: 'ng2-smart-table-cell',
    template: `
@switch (isInEditing) {
  @case (false) {
    <table-cell-view-mode
      [cell]="cell"
      [isExpanded]="isExpanded">
    </table-cell-view-mode>
  }
  @case (true) {
    <table-cell-edit-mode
      [editingFormGroup]="editingFormGroup"
      [cell]="cell"
      [inputClass]="inputClass"
      [updateColumnList]="updateColumnList"
      (edited)="onEdited()"
      (selectedElem)="selectedElem.emit($event)">
    </table-cell-edit-mode>
  }
}
`,
    standalone: true,
    imports: [ViewCellComponent, EditCellComponent]
})
export class CellComponent {
    /**
     * Pass down to the form (editing) Inputs the Table's "editingForm":
     */
    @Input() editingFormGroup: UntypedFormGroup;

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
