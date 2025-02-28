import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { Grid } from '../../../lib/grid';
import { Row } from '../../../lib/data-set/row';
import { Cell } from '../../../lib/data-set/cell';
import { THeadCreateCancelComponent } from '../cells/create-cancel.component';
import { CellComponent } from '../../cell/cell.component';
import { ActionsTitleComponent } from '../cells/actions-title.component';


@Component({
    selector: '[ng2-st-thead-form-row]',
    template: `
        @if (colorRow) {
          <th class="ng2-smart-actions"></th>
        }
        @if (isMultiSelectVisible) {
          <th class="ng2-smart-th ng2-smart-action-multiple-select">
          </th>
        }
        <!-- Empty th for the collapsed icon -->
        @if (tableCollapsible.isCollapsible) {
          <th ng2-st-actions-title
            [grid]="grid"
            class="slds-p-top--small slds-p-bottom--xx-small">
          </th>
        }
        
        @for (cell of grid.getNewRow().cells; track cell) {
          @if (cell.column.isVisibled) {
            <th>
              <ng2-smart-table-cell
                [editingFormGroup]="editingFormGroup"
                [cell]="cell"
                [grid]="grid"
                [isNew]="true"
                [updateColumnList]="updateColumnList"
                [createConfirm]="createConfirm"
                [inputClass]="addInputClass"
                [isInEditing]="grid.getNewRow().isInEditing"
                (selectedElem)="selectedElem.emit($event)"
                (edited)="onCreate($event)">
              </ng2-smart-table-cell>
            </th>
          }
        }
        
        <!-- ACTIONS -->
        @if (showActionColumnRight) {
          <th class="ng2-smart-actions slds-text-align--right">
            <ng2-st-actions
              [editingFormGroup]="editingFormGroup"
              [grid]="grid"
              [cancelCreate]="cancelCreate"
              (create)="onCreate($event)">
            </ng2-st-actions>
          </th>
        }
        `,
    standalone: true,
    imports: [
    ActionsTitleComponent,
    CellComponent,
    THeadCreateCancelComponent
],
})
export class TheadFormRowComponent implements OnChanges {

    // Recieve, here, the Table's "editingForm":
    @Input() editingFormGroup: UntypedFormGroup;

    @Input() grid: Grid;

    @Input() row: Row;

    @Input() createConfirm: EventEmitter<any>;

    @Input() updateColumnList: any;

    @Input() cancelCreate: EventEmitter<any>;

    @Output() create = new EventEmitter<any>();

    @Output() selectedElem = new EventEmitter<any>();

    @Output() createSave = new EventEmitter<any>();

    colorRow: boolean;
    isMultiSelectVisible: boolean;
    showActionColumnRight: boolean;
    addInputClass: string;
    tableCollapsible: any;

    onCreate(event: any) {
        event.stopPropagation();

        if (!this.grid.getSetting('add.confirmCreate')) {
            // As it will be saved immediately, send to the instalation the Created Data to be, i.e., API call saved @ BD:
            this.createSave.emit({
                newRow: this.grid.getNewRow().cells.map((cell: Cell) => cell.newValue)
            });
        }

        // Save data @ grid, checking if it needs an "createConfirm" or not:
        this.grid.create(this.grid.getNewRow(), this.createConfirm);
    }

    ngOnChanges() {
        this.colorRow = this.grid.hasColorRow();
        this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
        this.showActionColumnRight = this.grid.showActionColumn('right');
        this.addInputClass = this.grid.getSetting('add.inputClass');
        this.tableCollapsible = this.grid.getSetting('tableCollapsible');
    }
}
