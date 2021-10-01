import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';

import { Grid } from '../../../lib/grid';
import { Row } from '../../../lib/data-set/row';

@Component({
    selector: 'ng2-st-tbody-edit-delete',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <uno-icon
            [id]="edit"
            *ngIf="!editRowProperty && isActionEdit"
            size="xx-small"
            icon="edit"
            class="slds-button__icon--left uno-smart-table-action uno-smart-table-action-edit-edit"
            [title]="editRowButtonContent | translate"
            (click)="onEdit($event)">
        </uno-icon>

        <uno-icon
            [id]="edit"
            *ngIf="row.data[editRowProperty] && isActionEdit"
            size="xx-small"
            icon="edit"
            class="slds-button__icon--left uno-smart-table-action uno-smart-table-action-edit-edit"
            [title]="editRowButtonContent | translate"
            (click)="onEdit($event)">
        </uno-icon>

        <uno-icon
            id="trash"
            *ngIf="!deleteRowProperty && isActionDelete"
            size="xx-small"
            icon="trash"
            class="uno-smart-table-action uno-smart-table-action-delete-delete"
            [title]="deleteRowButtonContent | translate"
            (click)="onDelete($event)">
        </uno-icon>

        <uno-icon
            id="trash"
            *ngIf="row.data[deleteRowProperty] && isActionDelete"
            size="xx-small"
            icon="trash"
            class="uno-smart-table-action uno-smart-table-action-delete-delete"
            [title]="deleteRowButtonContent | translate"
            (click)="onDelete($event)">
        </uno-icon>
  `,
})
export class TbodyEditDeleteComponent implements OnChanges {

    @Input() grid: Grid;

    @Input() row: Row;

    @Input() deleteConfirm: EventEmitter<any>;

    @Output() edit = new EventEmitter<any>();

    @Output() delete = new EventEmitter<any>();

    @Output() editRowSelect = new EventEmitter<any>();

    isActionEdit: boolean;
    isActionDelete: boolean;
    editRowProperty: string;
    deleteRowProperty: string;
    editRowButtonContent: string;
    deleteRowButtonContent: string;

    ngOnChanges() {
        this.isActionEdit = this.grid.getSetting('actions.edit');
        this.isActionDelete = this.grid.getSetting('actions.delete');
        this.editRowProperty = this.grid.getSetting('actions.editRowProperty');
        this.deleteRowProperty = this.grid.getSetting('actions.deleteRowProperty');
        this.editRowButtonContent = this.grid.getSetting('edit.editButtonContent');
        this.deleteRowButtonContent = this.grid.getSetting('delete.deleteButtonContent');
    }

    onEdit(event: any) {
        event.preventDefault();
        event.stopPropagation();

        this.editRowSelect.emit(this.row);

        this.edit.emit({
            data: this.row.data,
            source: this.grid.source,
        });

        this.grid.edit(this.row);
    }

    onDelete(event: any) {
        event.preventDefault();
        event.stopPropagation();

        if (this.grid.getSetting('mode') === 'external') {
            this.delete.emit({
                data: this.row.data,
                source: this.grid.source,
            });
        } else {
            this.grid.delete(this.row, this.deleteConfirm);
        }
    }
}
